import { Navigate, Route, Routes } from "react-router";
import Homepage from "./Pages/Homepage.jsx";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import NotificationPage from "./Pages/NotificationPage";
import CallPage from "./Pages/CallPage";
import ChatPage from "./Pages/ChatPage";
import OnboardingPage from "./Pages/OnboardingPage.jsx";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";

function App() {
  // tanstack
  const {
    data: authData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authUser"],

    queryFn: async () => {
      const res = await axiosInstance.get("auth/me");
      return res.data;
    },
    retry: false,
  });
  const authUser = authData?.user;

  return (
    <>
      <div className=" h-screen w-full" data-theme="coffee">
        <button onClick={() => toast.success("Hello WOrld")}>
          Click a toast
        </button>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Homepage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!authUser ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/notification"
            element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/call"
            element={authUser ? <CallPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat"
            element={authUser ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/onboarding"
            element={authUser ? <OnboardingPage /> : <Navigate to="/login" />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
