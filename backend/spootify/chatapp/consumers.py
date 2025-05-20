import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = f"chat_{self.user_id}"

        print(f"[WebSocket] Connect from user_id={self.user_id}, group={self.room_group_name}")

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        print(f"[WebSocket] Disconnect from group {self.room_group_name}")
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        try:
            print(f"[WebSocket] Raw data: {text_data}")
            data = json.loads(text_data)

            if "message" not in data or "from" not in data or "to" not in data:
                print("[WebSocket] Invalid data keys")
                return

            message = data["message"]
            from_user = data["from"]
            to_user = data["to"]

            print(f"[WebSocket] Message from {from_user} to {to_user}: {message}")

            await self.channel_layer.group_send(
                f"chat_{to_user}",  # gửi đến group của người nhận
                {
                    "type": "chat_message",
                    "message": message,
                    "from": from_user,
                    "to": to_user,
                }
            )

        except json.JSONDecodeError:
            print("[WebSocket] JSON decode error")

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "from": event["from"],
            "to": event["to"],
        }))
