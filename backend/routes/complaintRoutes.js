const express = require("express");
const {
  submitComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} = require("../controllers/complaintController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, submitComplaint);
router.get("/my", protect, getMyComplaints);

router.get("/", protect, adminOnly, getAllComplaints);
router.put("/:id/status", protect, adminOnly, updateComplaintStatus);

module.exports = router;

