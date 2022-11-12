const router = require("express").Router();
const Conversation = require("../models/Conversation");
const { protect } = require("../middleware/verifyToken");
//new conv

router.post("/", protect, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", protect, async (req, res) => {
  //done
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).populate("members");
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// conv of  two userId

router.get("/find/:firstUserId/:secondUserId", protect, async (req, res) => {
  //done
  try {
    const conversation = await Conversation.findOneAndReplace(
      {
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      },
      { members: [req.params.firstUserId, req.params.secondUserId] },
      { upsert: true, new: true }
    );
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
