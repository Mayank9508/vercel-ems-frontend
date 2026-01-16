import { axiosInstance } from "../../config/axiosInstance";

export const userLogoutApi = async () => {
  try {
    let res = await axiosInstance.post("/auth/logout");
    if (res) {
      return res.data;
    }
  } catch (err) {
    console.error("Error in Logout Api", err.message);
  }
};