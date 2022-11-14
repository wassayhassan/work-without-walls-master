// require("dotenv").config({ path: "./.env.local" });
const express = require("express");
const path = require("path")
const morgan = require("morgan");
const cloudinary = require("cloudinary").v2;
const fileupload = require("express-fileupload");
const cors = require("cors");

const { createServer } = require("http");
const redis = require("./redis/redis-client");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
require('dotenv').config({ path: path.resolve(__dirname, './config.env') });

const { Server } = require("socket.io");



const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  maxHttpBufferSize: 1e8,
});

const PORT = process.env.PORT || 7900;



// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileupload({ useTempFiles: true }));

app.use(morgan("tiny"));

/* Sockets */
const onlineUsers = {};
io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", async ({ user }) => {
    onlineUsers[user] = await User.findOne({ _id: user });
    io.emit("getUsers", onlineUsers);
  });
  socket.on("join", (data) => {
    socket.join(data.conversationId);
  });

  //send and get message
  socket.on(
    "sendMessage",
    async ({ senderId, receiverId, text, conversationId, mtype }) => {
      await Message.create({
        text,
        mtype,
        conversationId,
        sender: senderId,
      });
      io.sockets.in(conversationId).emit("getMessage", {
        senderId,
        text,
        mtype,
      });
    }
  );

  //when disconnect
  socket.on("offline", ({ user }) => {
    console.log("a user disconnected!");
    delete onlineUsers[user];
    io.emit("getUsers");
  });
});

//routes
const routes = require("./routes/api");
const auth = require("./routes/auth");
const home = require("./routes/Home");
const admin = require("./routes/admin");
const jobs = require("./routes/job.routes");
const dbConnection = require("./database/connection");
const Message = require("./models/Message");
const User = require("./models/User");
const Team = require("./routes/Team.routes");
const bids = require("./routes/bid.routes");
const order = require("./routes/order.routes");
const orderActivites = require('./routes/orderactivitiesRoutes');
const reviews = require("./routes/review.routes");
const uploads = require("./routes/ordermaterial.routes");

dbConnection();

app.use("/home", home);
app.use("/uploads", uploads);
app.use('/review', reviews);
app.use("/api", routes);
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/Job", jobs);
app.use("/bid", bids);
app.use("/order", order);
app.use('/orderactivity', orderActivites)
app.use("/Team", Team);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
server.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
