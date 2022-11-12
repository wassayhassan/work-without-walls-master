const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  gigTitle: {
    type: String,
  },
  description: {
    type: String,
    default: "",
  },
  budget: {
    type: Number,
    default: "",
  },
  status: {
    type: String,
    enum: [
      "active",
      "inactive",
      "assigned",
      "completed",
      "cancelled",
      "closed",
      "deleted",
    ],
    default: "active",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    default: "",
    ref: "User",
  },
  category: {
    type: String,
    default: "",
  },
  img1: {
    type: String,
    default: "",
  },
  assignedAt: {
    type: String,
    default: "",
  },
  completedAt: {
    type: String,
    default: "",
  },
  canceledAt: {
    type: String,
    default: "",
  },
  deletedAt: {
    type: String,
    default: "",
  },
  options: {
    type: String,
    default: "",
  },
  createdAt:{
    type:String,
    default: "",
  },
  reviews: {
    type: String,
    default: "",
  },
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
