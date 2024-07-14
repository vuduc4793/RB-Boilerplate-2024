import axios from "axios";

import { requestLog } from "./logger";
import TokenService from "./tokenServices";
import { refreshTokenApi } from "./users";
import Config from "react-native-config";
import { Alert, Platform } from "react-native";
import Storage from "@/utils/storage";

import Routes from "@/navigators/Routes";
import DeviceInfo from "react-native-device-info";
import { reset } from "@/navigators/rootNavigation";

const headers = {
  "Content-Type": "application/json",
  Accept: "*/*",
  Connection: "keep-alive",
  "User-Agent":
    DeviceInfo.getModel() + "/" + Platform.OS + "/" + Platform.Version + "/App",
};

export const BASE_URL = Config.API_URL;

export const BASE_STORAGE_URL = Config.BUCKET_URL;
__DEV__ && console.log(Config.ENVIRONMENT_NAME);
__DEV__ && console.log(Config.API_URL);
__DEV__ && console.log(Config.BUCKET_URL);

const Request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers,
});
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

Request.interceptors.request.use(
  (config) => {
    const localAccessToken = TokenService.getLocalAccessToken();
    if (localAccessToken && config.url !== "auth/login") {
      config.headers.Authorization = `Bearer ${localAccessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Request.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    return Promise.reject(err);
  }
);

Request.interceptors.request.use(
  (req) => {
    // console.log(req)
    requestLog(req.method, req.url, req, "req");

    return req;
  },
  (error) => {
    requestLog(error?.config?.method, error?.config?.url, error, "err");
    return error;
  }
);

Request.interceptors.response.use(
  (res) => {
    requestLog(res.config.method, res.config.url, res, "res");

    return res;
  },
  async (error) => {
    const originalRequest = error.config;
    requestLog(originalRequest?.method, originalRequest?.url, error, "err");

    if (
      error?.response?.status === 401 &&
      !originalRequest?._retry &&
      originalRequest?.url !== "auth/login" &&
      originalRequest?.url !== "auth/refresh-token"
    ) {
      if (isRefreshing) {
        try {
          const token = await new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return await axios(originalRequest);
        } catch (err) {
          Storage.clearAll();
          reset({
            index: 0,
            routeName: Routes.SPLASH,
          });
          return await Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function (resolve, reject) {
        refreshTokenApi()
          .then(({ accessToken, refreshToken }) => {
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + accessToken;
            originalRequest.headers["Authorization"] = "Bearer " + accessToken;
            processQueue(null, accessToken);
            resolve(axios(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);

            reject(err);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    } else if (
      (error?.response?.status === 401 &&
        originalRequest?.url === "auth/refresh-token") ||
      (error?.response?.status === 400 &&
        originalRequest?.url === "auth/refresh-token")
    ) {
      Storage.clearAll();
      reset({
        index: 0,
        routeName: Routes.SPLASH,
      });
    } else if (error?.message == "Network Error") {
      Alert?.alert("Vui lòng kiểm tra lại kết nối mạng của thiết bị!");
      return Promise.reject("NETWORK");
    }
    return Promise.reject(error);
  }
);

export default Request;
