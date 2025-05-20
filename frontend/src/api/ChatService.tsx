import { authInstance as axios } from "./CustomAxios";

export const getChatHistory = async (fromId: number, toId: number) => {
  const res = await axios.get(`chat/history/`, {
    params: { from: fromId, to: toId },
  });
  return res.data;
};
