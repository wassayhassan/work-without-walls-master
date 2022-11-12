const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const profile = new Schema({
  profileImg: String,
  fbUsername: String,
  githubUsername: String,
  instaUsername: String,
  title: String,
  rate: Number,
  description: String,
  workHistory: String,
  portfolio: String,
  skills: String,
  userId: { ref: "BlogPost", type: mongoose.Types.ObjectId },
});
const Profile = mongoose.model("Profile", profile);
module.exports = Profile;
