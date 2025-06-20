import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api.js";
const useAuthUser = () => {
  const authUser = useQuery({
    /// it is something important
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });
  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};

export default useAuthUser;
