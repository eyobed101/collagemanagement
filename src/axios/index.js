import axios from "axios";

const URL_MAIN = "https://localhost:7233/api";
const BASE_URL = "https://localhost:7233";

export const authenticatedAxios = axios.create({
  baseURL: "https://localhost:7233/api",
});

authenticatedAxios.interceptors.request.use(
  (request) => {
    if (!request.headers.common) {
      request.headers.common = {};
    }
    request.headers.common["Accept"] = "application/json";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authenticatedAxios.interceptors.response.use(
  (response) => {
    console.log("got response");
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);