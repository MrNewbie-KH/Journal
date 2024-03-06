import {deleteUser,getAllUsers,getUser} from "../controllers/user"
import express from "express"
import protect from "../middlewares/authMiddleware";
const router = express.Router();
import { getPostsByUser } from "../controllers/post";
router.route("/").get(getAllUsers);
// router.route("/:id").patch(updateUser);
router.route("/:id").delete(protect,deleteUser);
router.route("/:id").get(getUser);
router.route("/posts/:id").get(protect,getPostsByUser)
export default router;
