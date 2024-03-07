import express,{ Express } from "express";
import protect from "../middlewares/authMiddleware";
import { createPost ,getAllPosts, getSinglePost,getPostsByUser, updatePost,deletePost} from "../controllers/post";
import uploadMiddleware from "../middlewares/imageUpload";
const router = express.Router();
router.route("/").post(protect,uploadMiddleware,createPost)
router.route("/").get(protect,getAllPosts)
router.route("/:id").get(protect,getSinglePost).patch(protect,updatePost).delete(protect,deletePost)
export default router