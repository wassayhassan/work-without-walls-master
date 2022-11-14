const  OrderActivity = require("../models/orderActivitiesModel");

const createActivity = async(req, res) => {
   const activity = new OrderActivity(req.body);
   try{
    activity.save().then((data)=> {
        res.status(200).json(data);
    })
   }catch(err){
    res.status(400).json(err);
   }
}
const getActivitiesByOrderId = async(req, res) => {
    console.log("gelld")
    try{
        const activities = await OrderActivity.find({orderId: req.params.id});
        res.status(200).json(activities);
    }catch(err){
        res.status(400).json(err);
    }
}
module.exports = {createActivity, getActivitiesByOrderId};