const Order = require('../models/orderModel');
const bidModel = require("../models/bidModel");


const createNewOrder = async(req, res) => {
   
    const order = new Order(req.body);
    try{
            const data = await order.save()
            const update = await bidModel.findByIdAndUpdate(req.body.offerid, {accepted: "true", orderId: data._id});
            res.status(200).json(update);
            console.log(update);
            console.log(data);
        
    }catch(err){
        res.status(500).json(err);
    }

}
const getOrderById = async(req, res) => {
    try{
        const order = await Order.findOne({_id: req.params.id});
        res.status(200).json(order);
    }catch(err){
        console.log(err)
        res.status(400).json(err);
    }
}
const addDelivery = async(req, res) => {
    try{
      const order = await Order.findByIdAndUpdate({_id: req.params.id}, {delivered: "true"});
      res.status(200).json(order);
    }catch(err){
        res.status(400).json(err);
    }
}
module.exports = {createNewOrder, getOrderById, addDelivery};
