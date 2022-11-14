const OrderNote  = require("../models/orderNotesModel");

const createNote = async(req, res) => {
   try{
    const note  = await OrderNote(req.body);
    res.status(200).json(note);
   }catch(err){
    res.status(400).json(err);
   }
}
const getNoteByOrderId = async(req, res)=> {
    try{
     let data = await OrderNote.find({orderId: req.params.id});
     res.status(200).json(data);
    }catch(err){
        res.status(400).json(err);
    }
}
const getNoteById = async(req, res) => {
    try{
        let data = await OrderNote.find({_id: req.params.id});
        res.status(200).json(data);
       }catch(err){
           res.status(400).json(err);
       }
   }
module.exports = {createNote, getNoteByOrderId, getNoteById}