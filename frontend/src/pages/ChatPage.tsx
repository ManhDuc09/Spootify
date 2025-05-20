import { useState, useEffect, useRef } from "react";
import { getAllUser, User } from "../api/UserService";
import { useAuth } from "../contexts/AuthContext";
import { getChatHistory } from "../api/ChatService";

const ChatPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageHistory, setMessageHistory] = useState<{
    [userId: number]: { from: number; to: number; message: string }[];
  }>({});

  const [inputText, setInputText] = useState("");
  const { user } = useAuth();

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    socket.current = new WebSocket(`ws://localhost:8000/ws/chat/${user.id}/`);

    socket.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data &&
        typeof data === "object" &&
        "from" in data &&
        "to" in data &&
        "message" in data
      ) {
        const otherUserId =
          Number(data.from) === Number(user?.id) ? data.to : data.from;

        setMessageHistory((prev) => ({
          ...prev,
          [otherUserId]: [...(prev[otherUserId] || []), data],
        }));
      } else {
        console.warn("Invalid message format received:", data);
      }
    };

    socket.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.current?.close();
    };
  }, [user?.id]);

  const handleUserSelect = async (selected: User) => {
    setSelectedUser(selected);

    if (messageHistory[selected.id]) return;

    try {
      const history = await getChatHistory(Number(user?.id), selected.id);
      setMessageHistory((prev) => ({
        ...prev,
        [selected.id]: history,
      }));
    } catch (error) {
      console.error("Failed to fetch chat history", error);
    }
  };

  const handleSend = () => {
    if (!inputText.trim() || !selectedUser || !socket.current) return;

    const newMessage = {
      from: Number(user?.id),
      to: selectedUser.id,
      message: inputText.trim(),
    };

    socket.current.send(JSON.stringify(newMessage));
    setMessageHistory((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
    }));

    setInputText("");
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-700 p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        {users
          .filter((u) => Number(u.id) !== Number(user?.id))
          .map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className={`flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-gray-800 ${
                selectedUser?.id === user.id ? "bg-gray-800" : ""
              }`}
            >
              <img
                src={
                  user.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnPjE6XeVDfS1fnLGfBtagErobejdjZhOHDw&s"
                }
                alt="avatar"
                className="rounded-full w-10 h-10"
              />
              <span>{user.username}</span>
            </div>
          ))}
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-grow p-4" style={{ height: "100vh" }}>
        {/* Header */}
        <div className="border-b border-gray-700 pb-2 flex-shrink-0">
          <h2 className="text-xl font-semibold">
            {selectedUser
              ? `Chat with ${selectedUser.username}`
              : "Select a user"}
          </h2>
        </div>

        {/* Messages */}
        <div
          className="flex-grow overflow-y-auto mt-2"
          style={{ minHeight: 0 }}
        >
          {!selectedUser ? (
            <p className="text-gray-400">No user selected</p>
          ) : (
            (messageHistory[selectedUser.id] || []).map((m, idx) => (
              <div
                key={idx}
                className={`mb-2 max-w-xs p-2 rounded ${
                  m.from === Number(user?.id)
                    ? "bg-blue-600 self-end ml-auto"
                    : "bg-gray-700"
                }`}
              >
                {m.message}
              </div>
            ))
          )}
        </div>

        {/* Input form */}
        {selectedUser && (
          <form
            className="flex gap-2 flex-shrink-0 mt-2"
            style={{ height: "38px" }}
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input
              type="text"
              className="flex-grow p-1 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{ height: "100%" }}
            />
            <button
              type="submit"
              className="bg-blue-600 px-4 rounded hover:bg-blue-700"
              style={{ height: "100%" }}
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
