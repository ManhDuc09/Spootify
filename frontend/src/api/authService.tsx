import axios from "./CustomAxios";

interface UserData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const registerUser = async (userData: UserData) => {
  return axios.post("register/", userData);
};

interface AuthResponse {
  access: string;
  refresh: string;
}

export const loginUser = async (userData: {
  username: string;
  password: string;
}): Promise<AuthResponse> => {
  const data = await axios.post<AuthResponse, AuthResponse>("token/", userData);
  return data;
};

export interface UserInfo {
  id: string;
  username: string;
  email: string;
  role: string;
}

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const user = (await axios.get("me/")) as UserInfo;
    return user;
  } catch (error: any) {
    console.error(
      "Lỗi khi lấy thông tin người dùng:",
      error?.response?.data || error
    );
    return null;
  }
};
