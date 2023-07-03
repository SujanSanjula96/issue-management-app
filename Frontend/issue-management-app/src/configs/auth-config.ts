import config from "../config.json";
import { IssueAPI } from "./api";

export const authConfig = {
  baseUrl: config.baseUrl,
  clientID: config.clientID,
  scope: [
    "openid",
    "profile",
    IssueAPI.permissions.view,
    IssueAPI.permissions.create,
    IssueAPI.permissions.close,
  ],
  signInRedirectURL: config.signInRedirectURL,
  signOutRedirectURL: config.signOutRedirectURL,
  resourceServerURLs: [IssueAPI.baseURL],
};
