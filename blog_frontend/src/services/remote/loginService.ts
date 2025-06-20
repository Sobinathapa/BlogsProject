import axiosInstance from "@/services/apiService";
import { LoginRequest } from "@/types";

const loginService = async (loginRequest: LoginRequest) => {
  const response = await axiosInstance.post("/auth/login", loginRequest, {
    isAuthRoute: false,
  });
  return response.data;
};

export default loginService;
