import express,{ Express } from "express";
import { createCategory,deleteCategory,getAllCategories,updateCategory } from "../controllers/category";
import protect from "../middlewares/authMiddleware";
const router = express.Router();
router.post("/",createCategory);
router.get("/",getAllCategories);
router.route("/:id").patch(protect,updateCategory).delete(deleteCategory)
export default router