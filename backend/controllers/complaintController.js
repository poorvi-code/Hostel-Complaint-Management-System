const Complaint = require("../models/Complaint");

const allowedCategories = ["Electrical", "Plumbing", "Cleaning", "Internet", "Furniture", "Other"];
const allowedPriorities = ["Low", "Medium", "High"];
const allowedStatuses = ["Pending", "In Progress", "Resolved"];

const submitComplaint = async (req, res, next) => {
  try {
    const { category, description, priority } = req.body;

    if (!category || !description || !priority) {
      return res.status(400).json({ message: "Category, description, and priority are required" });
    }

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (!allowedPriorities.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority" });
    }

    if (description.trim().length < 5 || description.trim().length > 500) {
      return res.status(400).json({ message: "Description must be 5 to 500 characters" });
    }

    const complaint = await Complaint.create({
      student: req.user._id,
      category,
      description: description.trim(),
      priority
    });

    return res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });
  } catch (error) {
    next(error);
  }
};

const getMyComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({ student: req.user._id })
      .sort({ createdAt: -1 })
      .populate("student", "name email");

    return res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

const getAllComplaints = async (req, res, next) => {
  try {
    const { category, status } = req.query;
    const filter = {};

    if (category) {
      if (!allowedCategories.includes(category)) {
        return res.status(400).json({ message: "Invalid category filter" });
      }
      filter.category = category;
    }

    if (status) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid status filter" });
      }
      filter.status = status;
    }

    const complaints = await Complaint.find(filter)
      .sort({ createdAt: -1 })
      .populate("student", "name email");

    return res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

const updateComplaintStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Valid status is required" });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    return res.status(200).json({
      message: "Complaint status updated",
      complaint
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
};

