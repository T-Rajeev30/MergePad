import React from "react";
import useAuthUser from "../src/hooks/useAuthUser";
import { Link, useLocation } from "react-router-dom";
import { BellIcon, HomeIcon, Merge, UsersIcon } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const uselocation = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="w-64  sidebar  top-0  bg-base-200 border-r border-base-300 hidden lg:flex flex-col">
      <div className="p-5 border-b shrink-0 border-base-300">
        <Link to="/" className="flex items-center  gap-2.5">
          <Merge className="size-9 text-primary" />
          <span className="text-3xl font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
            MergePad
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link
          to="/"
          className={`btn btn-ghost justify-start w-full gap-3 x-3 normal-case ${
            currentPath === "/" ? "btn-active" : ""
          }`}
        >
          <HomeIcon className="size-5 text-base-content opacity-70" />
          <span>Home</span>
        </Link>
        <Link
          to="/friends"
          className={`btn btn-ghost justify-start w-full gap-3 x-3 normal-case ${
            currentPath === "/friends" ? "btn-active" : ""
          }`}
        >
          <UsersIcon className="size-5 text-base-content opacity-70" />
          <span>Friends</span>
        </Link>{" "}
        <Link
          to="/notifications"
          className={`btn btn-ghost justify-start w-full gap-3 x-3 normal-case ${
            currentPath === "/notifications" ? "btn-active" : ""
          }`}
        >
          <BellIcon className="size-5 text-base-content opacity-70" />
          <span>Notification</span>
        </Link>
      </nav>
      {/*USER  Profile section  */}

      <div className="p-4 border-t border-base-300 mt-auto ">
        <div className="flex gap-3 items-center ">
          <div className="avatar">
            <div className="w-10 h-10  overflow-hidden   rounded-full ">
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
          <div className="flex-1">
            <p className="font-semibold text-sm">{authUser?.fullName}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block">
                Online
              </span>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
