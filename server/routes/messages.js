const router = require("express").Router();
const Message = require("../models/Message");
const axios = require("axios");
const { protect } = require("../middleware/verifyToken");
//add

router.post("/",protect,async (req, res) => { //done
  req.body.mtype = "message";
  console.log(req.body)
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    const response = await axios.get(`http:localhost:7900/api/user/${req.body.sender}`);
    console.log(response)
    let newData = {
      userId: req.body.receiverId,
      message: `<a href="/messages" className="font-normal text-base text-black">Your received a message from <span className="font-medium text-base">${response.data.name}</span> </a>`,
      read: 'false'
    }
    axios.post('http:localhost:7900/notification', newData);
    res.status(200).json(savedMessage);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", protect,async (req, res) => { //done
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;