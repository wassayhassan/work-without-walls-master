const { json } = require("express");
const bidModel = require("../models/bidModel");
const Conversation = require("../models/Conversation");


const addNewBid = async(req, res) => {
   req.body.mtype = "offer";
   req.body.accepted = "false";
   let conversation = await Conversation.findOne({members: {$all: [req.body.senderId, req.body.receiverId]}});
   console.log(conversation);
   if(!conversation){
      let newConversation = new Conversation({members: [req.body.senderId, req.body.receiverId]});
      let data = await newConversation.save();
      console.log(data);
   }
   const bid = new bidModel(req.body);
   try{
     bid.save().then((data)=> {
       console.log(data);
       res.status(200).json(data);
     })
   }catch(err){
    res.status(400).json(err);
   }
}
const deleteBid = async(req, res) => {
     try{
         bidModel.findByIdAndDelete(req.params.id).then((data)=> {
            res.status(200).json(data);
         })
     }catch(err){
        console.log(err);
        res.status(400).json(err);
     }
}
const getOffersById = async(req, res) => {
    try{
        const offers = await bidModel.find({ $or:[ {'senderId': req.params.id}, {'receiverId': req.params.id}]});
        res.status(200).json(offers);
    }catch(err){
      res.status(400).json(err)
    }
}


module.exports = {addNewBid, deleteBid, getOffersById}