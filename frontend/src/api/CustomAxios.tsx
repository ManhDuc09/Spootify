import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

<<<<<<< HEAD
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
=======
export default instance as unknown as {
  get<T = any>(url: string, config?: any): Promise<T>;
 
};
>>>>>>> c57ee05d12a0eb888eb729aa9f64e82f810973c1
