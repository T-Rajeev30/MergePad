import { Navigate, Route, Routes } from "react-router";
import Homepage from "./Pages/Homepage.jsx";
import LoginPage from "./Pages/LoginPage";
import Signup from "./Pages/Signup";
import NotificationPage from "./Pages/NotificationPage";
import CallPage from "./Pages/CallPage";
import ChatPage from "./Pages/ChatPage";
import OnboardingPage from "./Pages/OnboardingPage.jsx";
import { Toaster } from "react-hot-toast";
import PageLoader from "../components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";

function App() {
  // tanstack

  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;
  return (
    <>
      <div className=" h-screen w-full" data-theme="coffee">
        {/* <button onClick={() => toast.success("Hello WOrld")}>
          Click a toast
        </button> */}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={!isAuthenticated ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/notification"
            element={
              isAuthenticated ? <NotificationPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/call"
            element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/chat"
            element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                !isOnboarded ? (
                  <OnboardingPage />
                ) : (
                  <Navigate to="/" />
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
