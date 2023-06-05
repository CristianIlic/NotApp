import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Navbar from "./Navbar";
import { Spinner } from "@chakra-ui/react";

export default function ProtectedRoute({ children }) {
  const { user, checkStatus } = useUserContext();

  if (!checkStatus && !user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {checkStatus ? (
        <Spinner />
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </>
  );
}
