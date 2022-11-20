const OrderNote  = require("../models/orderNotesModel");

const createNote = async(req, res) => {
   try{
    const note  = new OrderNote(req.body);
    const data = await note.save();
    res.status(200).json(data);
   }catch(err){
    res.status(400).json({msg: 'Error in Saving Note'});
   }
}
const getNoteByOrderId = async(req, res)=> {
    try{
     let data = await OrderNote.find({orderId: req.params.id});
     console.log(data)
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
const deleteNote = async(req, res) => {
    try{
      let data = await OrderNote.findByIdAndDelete({_id: req.params.id});
        res.status(200).json({msg: 'Note Deleted'})
    }catch(err){
        res.status(400).json({msg: 'Error in Deleting Note'});
    }
}
const updateNote = async(req, res) => {
  try{
  let data = await OrderNote.findByIdAndUpdate(req.params.id, req.body);
   res.status(200).json(data);
  }catch(err){
    res.status(400).json(err);
  }
}
module.exports = {createNote, getNoteByOrderId, getNoteById,updateNote, deleteNote}