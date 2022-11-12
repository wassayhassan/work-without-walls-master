const mongoose=require('mongoose')
const Schema=mongoose.Schema
const MessagePost=new Schema({
    Name:String,
    Email:String,
    Phone:Number,
    Message:String,
});
const Mp=mongoose.model('MessagePost',MessagePost)
module.exports=Mp;