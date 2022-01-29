import { Router } from "express";
const router = Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/userController.js";
import { auth, admin } from "../middleware/authMiddleware.js";
import { check } from "express-validator";

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter the correct password").exists(),
  ],
  authUser
);
router.post(
  "/register",
  [
    check("name", "Please enter a name").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter the correct password").exists(),
  ],
  registerUser
);
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);
router.route("/").get(auth, admin, getUsers);
router
  .route("/:id")
  .delete(auth, admin, deleteUser)
  .get(auth, admin, getUser)
  .put(auth, admin, updateUser);

export default router;
