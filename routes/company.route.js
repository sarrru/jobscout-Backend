import express from "express";
import isAuthenticated from "../middlewars/isAuthenticated.js";
import { deleteCompany, getCompany, getCompanyById, registerCompany, registerCompany1, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewars/mutler.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/register1").post(registerCompany1);


router.route("/get").get(getCompany);
router.route("/delete/:id").delete(deleteCompany);
router.route("/get/:id").get(getCompanyById);
router.route("/update/:id").put(isAuthenticated,singleUpload, updateCompany);

export default router;

