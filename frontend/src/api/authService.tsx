import axios from "../api/CustomAxios";

interface UserData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const registerUser = async (userData: UserData) => {
  return axios.post("register/", userData);
};

export const loginUser = async (
  userData: Omit<UserData, "confirmPassword">
) => {
  return axios.post("login/", userData);
};
