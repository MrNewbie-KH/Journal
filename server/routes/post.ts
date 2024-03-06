import express,{ Express } from "express";
import protect from "../middlewares/authMiddleware";
import { createPost ,getAllPosts} from "../controllers/post";
import uploadMiddleware from "../middlewares/imageUpload";
const router = express.Router();
router.route("/").post(protect,uploadMiddleware,createPost)
router.route("/").get(protect,getAllPosts)
export default router