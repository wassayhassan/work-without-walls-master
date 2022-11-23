const Notification = require("../models/NotificationModal");

const createNotification = async(req, res) => {
    try{
       const noti = new Notification(req.body);
       const data = await noti.save();
       res.status(200).json(data);
    }catch(err){
        res.status(400).json(err);
    }
}
const updateNotification = async(req, res) => {
    try{
       let data = await Notification.findByIdAndUpdate(req.params.id, req.body);
       res.status(200).json(data);
    }catch(err){
        res.status(400).json(err);
    }
}
const getNotificationsByUserId = async(req, res) => {
    try{
       let data = await Notification.find({userId: req.params.id}).sort({createdAt: -1});
       res.status(200).json(data);
    }catch(err){
        res.status(400).json(err);
    }
}
module.exports = {createNotification, updateNotification, getNotificationsByUserId}