import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../src/hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../src/lib/api";
import { BellIcon, LogOutIcon, Merge, MergeIcon } from "lucide-react";
import { THEMES } from "../src/constants";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const queryClient = useQueryClient();

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 w-full">
      <div className="flex items-center justify-between h-full w-full px-4">
        {/* Empty spacer to push the right section */}

        {/* Right-aligned content */}
        <div className="flex gap-4">
          {/* LOGO - ONLY IN THE CHAT PAGE */}
          {isChatPage && (
            <div className="pl-5">
              <Link to="/" className="flex items-center gap-2.5">
                <Merge className="size-9 text-primary" />
                <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary  tracking-wider">
                  MergePad
                </span>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <Link to={"/notifications"}>
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </Link>
          </div>

          {/* TODO */}
          <ThemeSelector />

          <div className="avatar">
            <div className="w-9 rounded-full">
              <img
                src={authUser?.profilePic}
                className="w-full h-full object-cover"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  maxWidth: "40px",
                  maxHeight: "40px",
                  display: "block",
                }}
                alt="User Avatar"
              />
            </div>
          </div>

          {/* Logout button */}
          <button className="btn btn-ghost btn-circle" onClick={logoutMutation}>
            <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
