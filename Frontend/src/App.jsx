import { Route, Routes } from "react-router";
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],

    queryFn: async () => {
      const res = await axiosInstance.get("http://localhost:5001/api/auth/me");
      return res.data;
    },
    retry: false,
  });
  console.log(data);

  return (
    <>
      <div className=" h-screen w-full" data-theme="coffee">
        <button onClick={() => toast.success("Hello WOrld")}>
          Click a toast
        </button>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/call" element={<CallPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
