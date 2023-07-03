import { PropsWithChildren } from "react";
import { useAccessControl } from "./use-access-control";

interface AccessControlProps {
  requiredScope: string;
  fallback?: React.ReactNode;
}

export const AccessControl: React.FunctionComponent<
  PropsWithChildren<AccessControlProps>
> = (props: PropsWithChildren<AccessControlProps>) => {
  const { requiredScope, fallback } = props;
  const allowedScopes = useAccessControl().scopes;

  return (
    <>{allowedScopes.includes(requiredScope) ? props.children : fallback}</>
  );
};
