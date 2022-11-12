const mongoose = require("mongoose");
//schema
const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  CNIC: String,
  phone: String,
  cnicFront: String,
  cnicBack: String,
  approve: Boolean,
  userRole: String,
});

const BlogPost = mongoose.model("BlogPost", BlogSchema);
module.exports = BlogPost;
