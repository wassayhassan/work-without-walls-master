const router = require("express").Router();
const Message = require("../models/Message");
const { protect } = require("../middleware/verifyToken");
//add

router.post("/",protect,async (req, res) => { //done
  req.body.mtype = "message";
  console.log(req.body)
  const newMessage = new Message(req.body);
  try {
    const savedMessage = await newMessage.save();
    
    res.status(200).json(savedMessage);
  } catch (err) {
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