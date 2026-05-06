import { AxiosInstance } from "axios";
import { authService } from "./services/authService";

export function setupInterceptors(apiClient: AxiosInstance) {
  apiClient.interceptors.request.use(async (config) => {
    const token = await authService.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}
