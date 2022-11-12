const  OrderActivity = require("../models/orderActivitiesModel");

const createActivity = async(req, res) => {
   const activity = new OrderActivity();
   try{
    activity.save().then((data)=> {
        res.status(200).json(data);
    })
   }catch(err){
    res.status(400).json(err);
   }
}
const getActivitiesById = async(req, res) => {
    try{
        const activities = OrderActivity.find({_id: req.params.id});
        res.status(200).json(activities);
    }catch(err){
        res.status(400).json(err);
    }
}
module.exports = {createActivity, getActivitiesById};