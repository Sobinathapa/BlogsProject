import { Router } from "express";
const router = Router();
import AuthRoutes from "@/routes/auth.routes";
import CategoriesRoutes from "@/routes/categories.routes";
import BlogsRoutes from "@/routes/blogs.routes";

router.use("/auth", AuthRoutes);
router.use("/categories", CategoriesRoutes);
router.use("/blogs", BlogsRoutes);

export default router;
