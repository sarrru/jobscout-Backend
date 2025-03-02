import express from "express";
import isAuthenticated from "../middlewars/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";


const router = express.Router();

router.route("/post").post( postJob);
router.route("/get").get( getAllJobs);
router.route("/getadminjobs").get( getAdminJobs);
router.route("/get/:id").get( getJobById);

// // export default router; for mobile
// import express from "express";
// import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

// const router = express.Router();

// router.post("/post", postJob);
// router.get("/all", getAllJobs);
// router.get("/get/:id", getJobById);
// router.get("/admin", getAdminJobs);

export default router;
