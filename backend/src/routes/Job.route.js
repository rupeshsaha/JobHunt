import { Router } from "express";
import { getJobs, postJob } from "../controllers/jobs.controller.js";

const router = Router()

router.get("/get-job", getJobs)
router.post("/post-job", postJob)

export default router