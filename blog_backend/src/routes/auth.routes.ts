import { Router } from "express";
const router = Router();

// Controllers
import {
  register,
  verify,
  login,
  logout,
  logoutAll,
  getProfile,
  resendEmailVerification,
  refreshToken,
  forgotPassword,
} from "@/controllers/auth";


import {
  registerValidator,
  verifyValidator,
  loginValidator,
  resendEmailVerificationValidator,
  forgotPasswordValidator,
} from "@/validators/auth";


import validate from "@/validators/validate";
import { auth } from "@/middlewares";


router.post("/register", registerValidator(), validate, register);
router.get("/verify/:token", verifyValidator(), validate, verify);
router.post("/login", loginValidator(), validate, login);
router.post("/logout", auth, logout);
router.post("/logout-all", auth, logoutAll);
router.get("/me", auth, getProfile);
router.post(
  "/resend-email-verification",
  resendEmailVerificationValidator(),
  validate,
  resendEmailVerification
);
router.post("/refresh", refreshToken);

router.post(
  "/forgot-password",
  forgotPasswordValidator(),
  validate,
  forgotPassword
);

export default router;
