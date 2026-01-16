import { axiosInstance } from "../../config/axiosInstance";

export const getAllDepartmentApi = async () => {
  console.log("me chala hu");

  try {
    let res = await axiosInstance.get("/department");
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log("Error in get Department Api", error.message);
  }
};
