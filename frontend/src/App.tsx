import MainLayout from "./layouts/MainLayout";
import AlbumPage from "./pages/AlbumPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import UserProfile from "./pages/UserProfile";
import AdminPanel from "./pages/Admin";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/album/:albumId" element={<AlbumPage />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/playlist/:playlistId" element={<AlbumPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
