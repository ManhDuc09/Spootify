import React, { useState, useEffect, useRef } from "react";

type Message = {
  sender: string;
  content: string;
};

type ChatProps = {
  username: string; 
};

const Chat: React.FC<ChatProps> = ({ username }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws/chat/");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = () => {
    if (
      input.trim() &&
      ws.current &&
      ws.current.readyState === WebSocket.OPEN
    ) {
      const message = { sender: username, content: input.trim() };
      ws.current.send(JSON.stringify(message));
      setInput("");
      setMessages((prev) => [...prev, message]); 
    }
  };

  return (
    <div style={{ border: "1px solid gray", padding: "10px", width: 300 }}>
      <h3>Chat</h3>
      <div
        style={{
          height: 200,
          overflowY: "auto",
          border: "1px solid black",
          marginBottom: 10,
          padding: 5,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 5 }}>
            <b>{msg.sender}: </b>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Nhập tin nhắn..."
        style={{ width: "80%" }}
      />
      <button onClick={sendMessage} style={{ width: "18%" }}>
        Gửi
      </button>
    </div>
  );
};

export default Chat;
