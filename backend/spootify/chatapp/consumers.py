import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = f"chat_{self.user_id}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get("message")
        from_user = data.get("from")
        to_user = data.get("to")

        if not message or not from_user or not to_user:
            return

        #luu db
        await self.save_message(from_user, to_user, message)

        # send message
        await self.channel_layer.group_send(
            f"chat_{to_user}",
            {
                "type": "chat_message",
                "message": message,
                "from": from_user,
                "to": to_user,
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            "message": event["message"],
            "from": event["from"],
            "to": event["to"],
        }))

    @sync_to_async
    def save_message(self, from_user_id, to_user_id, message):
        from music.models import ChatMessage 
        return ChatMessage.objects.create(from_user_id=from_user_id, to_user_id=to_user_id, message=message)
