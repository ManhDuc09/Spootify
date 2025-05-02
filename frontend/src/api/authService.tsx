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
  // interceptor đang bóc response.data, và TS cũng hiểu điều đó
  const data = await axios.post<AuthResponse, AuthResponse>("token/", userData);
  return data;
};
