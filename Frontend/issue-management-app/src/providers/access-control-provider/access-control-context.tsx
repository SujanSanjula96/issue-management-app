import { Context, createContext } from "react";

interface AccessControlContextInterface {
  scopes: string[];
}

export const AccessControlContext: Context<AccessControlContextInterface> =
  createContext({} as AccessControlContextInterface);
