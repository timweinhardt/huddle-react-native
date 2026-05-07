import { AxiosInstance, create } from "axios";
import { setupInterceptors } from "./interceptors";

const apiClient: AxiosInstance = create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

setupInterceptors(apiClient);

export default apiClient;
