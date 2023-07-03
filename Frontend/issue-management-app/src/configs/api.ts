import config from "../config.json";

export const IssueAPI = {
  baseURL: config.issueAPI.url,
  apiEndpoint: config.issueAPI.url + config.issueAPI.path,
  permissions: {
    view: config.issueAPI.viewPermission,
    create: config.issueAPI.createPermssion,
    close: config.issueAPI.closePermssion,
  },
};
