import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProfilePage from "./ProfilePage";

const ProfileWrapper: React.FC = () => {
  const { isAuthenticated, openAuthDialog } = useAuth();

  // If user is not authenticated, open auth dialog and redirect to home
  if (!isAuthenticated) {
    openAuthDialog("login");
    return <Navigate to="/" replace />;
  }

  // If user is authenticated, render the profile page
  return <ProfilePage />;
};

export default ProfileWrapper;
