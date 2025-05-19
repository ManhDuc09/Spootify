import axios from "axios";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

export const authInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

const handleResponse = (response: any) => response.data;
const handleError = (error: any) => Promise.reject(error);

instance.interceptors.response.use(handleResponse, handleError);
authInstance.interceptors.response.use(handleResponse, handleError);

authInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default instance as unknown as {
  get<T = any>(url: string, config?: any): Promise<T>;
};
