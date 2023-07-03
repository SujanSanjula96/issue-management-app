import {
  AsgardeoSPAClient,
  HttpClientInstance,
  HttpRequestConfig,
} from "@asgardeo/auth-react";
import { IssueAPI } from "../configs/api";

const httpClient: HttpClientInstance =
  AsgardeoSPAClient.getInstance().httpRequest.bind(
    AsgardeoSPAClient.getInstance()
  );

export const getIssues = () => {
  const requestConfig: HttpRequestConfig = {
    method: "GET",
    url: `${IssueAPI.apiEndpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  return httpClient(requestConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const createIssue = (issue: string) => {
  const requestConfig: HttpRequestConfig = {
    method: "POST",
    url: `${IssueAPI.apiEndpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { name: issue },
  };

  return httpClient(requestConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

export const updateIssue = (id: string) => {
  const requestConfig: HttpRequestConfig = {
    method: "PATCH",
    url: `${IssueAPI.apiEndpoint}/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: { status: "Closed" },
  };

  return httpClient(requestConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};
