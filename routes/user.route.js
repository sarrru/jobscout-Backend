
import express from "express";
// import { login, logout, register, updateProfile } from "../controllers/user.controller.js"; for web
import { login, logout, register, updateProfile, uploadImage } from "../controllers/user.controller.js";//for mobile
import isAuthenticated from "../middlewars/isAuthenticated.js";
import { singleUpload } from "../middlewars/mutler.js";
import upload from "../middlewars/uploads.js";


const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post( isAuthenticated,singleUpload,updateProfile);
router.post("/uploadImage", upload, uploadImage);//For mobile register signup

export default router;


