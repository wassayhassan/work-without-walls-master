const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    mongoose
      .connect(
        "mongodb://localhost:27017/fyp",
        {
          connectTimeoutMS: 20000,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log("✓", "Db Connected"))
      .catch((error) => console.log("error"));
  } catch (error) {
    console.log(error);
  }
};

module.exports = dbConnection;
