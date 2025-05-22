import MainLayout from "./layouts/MainLayout";
import AlbumPage from "./pages/AlbumPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import AdminPanel from "./pages/Admin";
import ChatPage from "./pages/ChatPage";
import ArtistPage from "./pages/ArtistPage";
import PlaylistPage from "./pages/PlaylistPage";
import SearchPage from "./pages/SearchPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./contexts/AuthContext";
import AdminRoute from "./pages/AdminRoute";
import "react-toastify/dist/ReactToastify.css";
import TrackPage from "./pages/TrackPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/album/:albumId" element={<AlbumPage />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/artist/:artistId" element={<ArtistPage />} />
            <Route path="/tracks/:trackId" element={<TrackPage />} />
          </Route>

          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
