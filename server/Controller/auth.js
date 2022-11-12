const BlogPost = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { redisClient } = require("../redis/redis-client");

const logins = asyncHandler(async (req, res) => {
 
  //corrected
  const { CNIC, password } = req.body;
  try {
    const user = await BlogPost.findOne({ CNIC });
    if (!user) {
      return res.status(400).json({ message: "Incorrect Credentials" });
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user.id,
        CNIC: user.CNIC,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        token: generateTOKEN(user._id),
        profileImg:user.profileImg,
        approve: user.approve,
        userrole: user.userRole,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const logout = async (req, res) => {
  const { token, tokenExp } = req;
  const token_key = `bl_${token}`;
  await redisClient.set(token_key, token);
  redisClient.expireAt(token_key, tokenExp);
  return res.status(200).json({
    message: "Logout successful",
  });
};

//generate tokens
const generateTOKEN = (id) => {
  //corrected
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const reset = async (req, res) => {
  //corrected
  const { CNIC, password } = req.body;
  console.log(req.body);
  BlogPost.findOne({ CNIC }, (err, result) => {
    if (err) {
      throw err;
    } else {
      if (result) {
        BlogPost.findOneAndUpdate(
          { CNIC },
          {
            password,
          },
          (err, user) => {
            if (err) console.log("Error Found");
            res.json({
              message: "Password Update Successful",
              user,
            });
          }
        );
      } else {
        console.log("Cant find ID");
      }
    }
  });
};

module.exports = { reset, logins, logout };
