import express, { Express } from "express";
const router = express.Router();
import {
  createComment,
  getAllCommentsOnPost,
  getSingleComment,
  updateComment,
  deleteComment,
} from "../controllers/comment";
import protect from "../middlewares/authMiddleware";
router.route("/post/:id").post(protect, createComment);
router.route("/post/:id").get(getAllCommentsOnPost);
router
  .route("/:id")
  .get(getSingleComment)
  .patch(protect,updateComment)
  .delete(protect,deleteComment);
export default router;
