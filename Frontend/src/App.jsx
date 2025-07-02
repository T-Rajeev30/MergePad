import { Navigate, Route, Routes } from "react-router";
import Homepage from "./Pages/Homepage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import Signup from "./Pages/Signup.jsx";
import NotificationPage from "./Pages/NotificationPage.jsx";
import CallPage from "./Pages/CallPage.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import OnboardingPage from "./Pages/OnboardingPage.jsx";
import PageLoader from "../components/PageLoader.jsx";
import { Toaster } from "react-hot-toast";
import useAuthUser from "./hooks/useAuthUser.js";
import { useState } from "react";
import { useThemeStore } from "./Store/useThemeStore.js";
import Layout from "../components/Layout.jsx";

function App() {
  // tanstack

  const { isLoading, authUser } = useAuthUser();

  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;
  return (
    <>
      <div className=" h-screen w-full" data-theme={theme}>
        {/* <button onClick={() => toast.success("Hello WOrld")}>
          Click a toast
        </button> */}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && isOnboarded ? (
                <Layout showSidebar={true}>
                  <Homepage />
                </Layout>
              ) : (
                <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <Signup />
              ) : (
                <Navigate to={isOnboarded ? "/" : "/onboarding"} />
              )
            }
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <LoginPage />
              ) : (
                <Navigate to={isOnboarded ? "/" : "/onboarding"} />
              )
            }
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
