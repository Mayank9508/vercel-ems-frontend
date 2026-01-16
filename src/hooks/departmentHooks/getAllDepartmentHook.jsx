import { useQuery } from "@tanstack/react-query";
import { getAllDepartmentApi } from "../../apis/departmentApis/DepartmentApis";

export const getAllDepartmentHook = () => {
  return useQuery({
    queryKey: ["departments"],
    queryFn: getAllDepartmentApi,
    staleTime: 20000,
  });
};

export default getAllDepartmentHook;