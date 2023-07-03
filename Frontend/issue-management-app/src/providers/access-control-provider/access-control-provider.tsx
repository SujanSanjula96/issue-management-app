import { useAuthContext } from "@asgardeo/auth-react";
import { useEffect, useState } from "react";
import { AccessControlContext } from "./access-control-context";

interface AccessControlProviderProps {
  children: React.ReactNode;
}

export const AccessControlProvider = (props: AccessControlProviderProps) => {
  const { children } = props;
  const { state, getBasicUserInfo } = useAuthContext();

  const [allowedScopes, setAllowedScopes] = useState<string[]>([]);

  useEffect(() => {
    if (state?.isAuthenticated) {
      getData();
    }
  }, [state?.isAuthenticated]);

  const getData = async () => {
    const basicUserInfo = await getBasicUserInfo();

    setAllowedScopes(basicUserInfo.allowedScopes.split(" "));
  };

  return (
    <AccessControlContext.Provider value={{ scopes: allowedScopes }}>
      {children}
    </AccessControlContext.Provider>
  );
};
