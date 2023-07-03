import { useContext } from "react";
import { AccessControlContext } from "./access-control-context";

export const useAccessControl = () => {
  const accessControlContext = useContext(AccessControlContext);

  return accessControlContext;
};
