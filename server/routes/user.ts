import {deleteUser,getAllUsers,getUser} from "../controllers/user"
import express from "express"
import protect from "../middlewares/authMiddleware";
const router = express.Router();

router.route("/").get(getAllUsers);
// router.route("/:id").patch(updateUser);
// router.route("/profileImage").post(uploadImage);
router.route("/:id").delete(protect,deleteUser);
router.route("/:id").get(getUser);
export default router;
