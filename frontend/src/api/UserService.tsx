import { authInstance as axios } from "./CustomAxios";

export interface User {
  avatar: string;
  username: ReactNode;
  id: number;
  name: string;
  image?: string;
}

export const getAllUser = async (): Promise<User[]> => {
  const response = await axios.get("users/");
  return response.results;
};