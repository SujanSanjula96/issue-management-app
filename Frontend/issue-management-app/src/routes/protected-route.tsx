import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@asgardeo/auth-react";

interface ProtectedRoutePropsInterface {
  component: any;
  redirectPath: string;
}

export const ProtectedRoute = (props: ProtectedRoutePropsInterface) => {
  const { component, redirectPath } = props;

  const { state } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isAuthenticated || state.isLoading) {
      return;
    }
    navigate(redirectPath);
  }, [state.isAuthenticated, state.isLoading]);

  if (!state.isAuthenticated) {
    return null;
  }

  return component;
};
