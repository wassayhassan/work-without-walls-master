const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const user = require("../models/User");
const { redisClient } = require("../redis/redis-client");

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // token provided?
      if (token == null) {
        return res.status(401).send({
          message: "No token provided",
        });
      }

      // token in deny list?
      const inDenyList = await redisClient.get(`bl_${token}`);
      if (inDenyList) {
        return res.status(401).send({
          message: "JWT Rejected",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await user.findById(decoded.id).select("-password");

      req.token = token;
      req.tokenExp = decoded?.exp;

      return next();
    } catch (error) {
      console.log("error", error);
      res.status(401).json({ message: "No token found!!" });
    }
  } else {
    let token;
    if (!token) {
      res.status(401);
      res.json({ message: "No token found!!" });
    }
  }
});

module.exports = { protect };
