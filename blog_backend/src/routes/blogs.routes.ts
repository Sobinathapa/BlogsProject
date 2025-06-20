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
} from "@/controllers/blogs";

import {
  createValidator,
  destroyValidator,
  getByAdminValidator,
  getSingleByAdminValidator,
  getSingleValidator,
  getValidator,
  updateValidator,
} from "@/validators/blogs";
import validate from "@/validators/validate";
import { auth, checkUserRole } from "@/middlewares";
import { uploadFileMiddleware } from "@/middlewares/multer.middleware";
import { FileStorageDirectory } from "@/enums";

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
  "/admin/:id",
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
  uploadFileMiddleware({
    directory: FileStorageDirectory.BLOG,
  }).single("featuredImage"),
  createValidator(),
  validate,
  create
);

router.put(
  "/:id",
  auth,
  checkUserRole(["admin"]),
  uploadFileMiddleware({
    directory: FileStorageDirectory.BLOG,
  }).single("featuredImage"),
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
