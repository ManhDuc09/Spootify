import React, { useState } from "react";
import { getUserInfo, loginUser } from "../api/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { username, password } = formData;

      const response = await loginUser({ username, password });
      console.log("Login response:", response);

      if (!response?.access || !response?.refresh) {
        alert("Đăng nhập thành công nhưng không nhận được token.");
        return;
      }

      localStorage.setItem("accessToken", response.access);
      localStorage.setItem("refreshToken", response.refresh);
      alert(localStorage.getItem("accessToken"));

      const user = await getUserInfo();
      console.log("User info:", user);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
      } else {
        alert("Lỗi lấy thông tin người dùng.");
        return;
      }

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      setIsLoggedIn(true);
      console.log("Tokens saved successfully.");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      alert(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc kết nối mạng."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 space-y-6">
        <div className="flex items-center justify-center mb-6 text-3xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-10 h-10 mr-2"
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png"
            alt="logo"
          />
          Spootify
        </div>
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white text-center">
          Log in to Spootify
        </h1>
        <form className="space-y-6" action="#" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="username"
              id="username"
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-600 focus:border-green-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              />
              Remember me
            </label>
            <a
              href="#"
              className="text-sm font-medium text-green-600 hover:underline dark:text-green-400"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm px-5 py-3 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
            Don’t have an account yet?{" "}
            <a
              href="/register"
              className="font-medium text-green-600 hover:underline dark:text-green-400"
            >
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
