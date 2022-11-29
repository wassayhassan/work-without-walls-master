const mongoose = require("mongoose");
const TeamModel=new mongoose.Schema({
title:{
    type:String,
},

logo:{
    type:String,
},
leaderName:{
    type:String,
},
teamMembers:{
    type: Array,
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
  membersCount: {
    type: Number
  }
  ,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    default: "",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    default: "",
    ref: "User",
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
  reviews: {
    type: String,
    default: "",
  }
},
{ timestamps: true }
)
module.exports=mongoose.model("Teams",TeamModel);