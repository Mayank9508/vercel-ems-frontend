import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000/api",
//   withCredentials: true,
// });


export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


