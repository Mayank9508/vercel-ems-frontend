// import { useQuery } from "@tanstack/react-query";
// import { userLogoutApi } from "../../apis/userApis/UserApis";

// const userLogoutHook = () => {
//   return useQuery({
//     queryKey: ["userLogout"],
//     queryFn: userLogoutApi,
//     // staleTime: Infinity,
//   });
// };

// export default userLogoutHook;

import { useMutation } from "@tanstack/react-query";
import { userLogoutApi } from "../../apis/userApis/UserApis";

const userLogoutHook = () => {
  return useMutation({
    mutationFn: userLogoutApi,
  });
};

export default userLogoutHook;

