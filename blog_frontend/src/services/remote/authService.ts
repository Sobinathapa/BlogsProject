import axios from "@/lib/apiService";

// Forgot Password API Call
export const forgotPassword = (email: string) => {
  return axios.post("/auth/forgot-password", { email });
};
