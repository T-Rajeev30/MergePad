import { Link, useLocation } from "react-router-dom";
import useAuthUser from "../src/hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../src/lib/api";
import { BellIcon, LogOutIcon, Merge } from "lucide-react";
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
    <nav className="nabav  bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 w-full">
      <div className=" h-full w-full px-4">
        {/* Empty spacer to push the right section */}
        <div className="flex flex-row justify-between">
          <div className="w-[50%] ">
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
          </div>
          <div className="flex flex-row gap-3">
            {/* Notification */}
            <div className="flex items-center gap-3 sm:gap-4 ml-auto">
              <Link to={"/notifications"}>
                <button className="btn btn-ghost btn-circle">
                  <BellIcon className="h-6 w-6 text-base-content opacity-70" />
                </button>
              </Link>
            </div>

            {/* ThemeSelector */}
            <div>
              <ThemeSelector />
            </div>

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

            <div>
              {/* Logout button */}
              <button
                className="btn btn-ghost btn-circle"
                onClick={logoutMutation}
              >
                <LogOutIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// </div>;
