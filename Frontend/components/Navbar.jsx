import { useLocation } from "react-router-dom";
import useAuthUser from "../src/hooks/useAuthUser";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const queryClient = useQueryClient();

  return <div>Navbar</div>;
};

export default Navbar;
