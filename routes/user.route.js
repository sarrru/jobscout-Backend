import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewars/isAuthenticated.js";
import { singleUpload } from "../middlewars/mutler.js";


const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post( isAuthenticated,singleUpload,updateProfile);

export default router;











