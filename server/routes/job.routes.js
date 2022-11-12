const express = require("express");
const {
  addNewJob,
  updateJobHandler,
  deleteJob,
  getAllJobs,
  getYourJobs
} = require("../Controller/job.controller");
const { protect } = require("../middleware/verifyToken");

const validateRequest = require('../validations/validateRequest')
const JobRequestSchema = require("../schema/jobs.schema")

const router = express.Router();

router.post("/create/", protect, validateRequest(JobRequestSchema), addNewJob);
router.get("/yourJob", protect, getYourJobs);
router.get("/", protect, getAllJobs)
router.put("/updateJob/:id([0-9a-fA-F]{24})", protect, updateJobHandler);
router.delete("/delete/:id([0-9a-fA-F]{24})", protect, deleteJob);

module.exports = router;
