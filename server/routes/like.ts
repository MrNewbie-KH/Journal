import express  from "express";
const router = express.Router();
import { toggleLike ,getAllLikes} from "../controllers/like";
import protect from "../middlewares/authMiddleware";
router.patch("/post/:id",protect,toggleLike);
router.get("/post/:id",protect,getAllLikes);
export default router;