import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

// axiosInstance?.interceptors?.response?.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // silently ignore
//       return Promise.reject(error);
//     }
//     console.error(error);
//     return Promise.reject(error);
//   }
// );
