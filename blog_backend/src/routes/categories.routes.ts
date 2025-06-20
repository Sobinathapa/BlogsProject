import { Router } from "express";
const router = Router();
import {
  create,
  destroy,
  get,
  getByAdmin,
  getSingle,
  getSingleByAdmin,
  update,
} from "@/controllers/categories";

import {
  createValidator,
  destroyValidator,
  getByAdminValidator,
  getSingleByAdminValidator,
  getSingleValidator,
  getValidator,
  updateValidator,
} from "@/validators/categories";
import validate from "@/validators/validate";
import { auth, checkUserRole } from "@/middlewares";

router.get("/", getValidator(), validate, get);

router.get(
  "/admin",
  auth,
  checkUserRole(["admin"]),
  getByAdminValidator(),
  validate,
  getByAdmin
);

router.get("/:slug", getSingleValidator(), validate, getSingle);

router.get(
  "/admin/:slug",
  auth,
  checkUserRole(["admin"]),
  getSingleByAdminValidator(),
  validate,
  getSingleByAdmin
);

router.post(
  "/",
  auth,
  checkUserRole(["admin"]),
  createValidator(),
  validate,
  create
);

router.put(
  "/:id",
  auth,
  checkUserRole(["admin"]),
  updateValidator(),
  validate,
  update
);

router.delete(
  "/:id",
  auth,
  checkUserRole(["admin"]),
  destroyValidator(),
  validate,
  destroy
);

export default router;
