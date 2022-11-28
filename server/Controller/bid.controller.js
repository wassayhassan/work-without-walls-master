const { json } = require("express");
const bidModel = require("../models/bidModel");
const Conversation = require("../models/Conversation");
const axios = require("axios");

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
     bid.save().then(async(data)=> {
       const response = await axios.get(`http:localhost:7900/api/user/${req.body.senderId}`);
       let newData3 = {
         userId: req.body.receiverId,
         message: `<a href="/messages" className="font-normal text-base text-black">You recieved a new <span className="font-medium text-base"> Order Offer </span> from <span className="font-medium text-base">${response.data.name}</span> </a>`,
         read: 'false'
       }
       axios.post('http:localhost:7900/notification', newData3);
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
const getBidsByTwoId = async(req, res) => {
   try{
      const offers = await bidModel.find({"senderId" : {
         $in : [
           req.params.id1,
           req.params.id2
         ]
       }, 'receiverId':  {$in: [req.params.id1, req.params.id2 ] }});
      res.status(200).json(offers);
  }catch(err){
   console.log(err)
    res.status(400).json(err)
  }
}
const updateBid = async(req, res) => {
   try{
       let offer = await bidModel.findByIdAndUpdate({_id: req.params.id}, req.body,{new: true});
       res.status(200).json(offer);
   }catch(err){
      res.status(400).json(err);
   }
}
const getBidById = async(req, res) => {
   try{
     let offer = await bidModel.findOne({_id: req.params.id});
     res.status(200).json(offer);
   }catch(err){
      res.status(400).json(err);
   }
}


module.exports = {addNewBid, deleteBid, getOffersById, updateBid, getBidsByTwoId, getBidById}