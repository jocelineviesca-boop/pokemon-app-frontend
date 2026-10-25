import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  isLoggedIn,
  isAuthLoading,
  children,
  onUnauthorized,
}) {
  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      onUnauthorized();
    }
  }, [
    isAuthLoading,
    isLoggedIn,
    onUnauthorized,
  ]);

  if (isAuthLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;