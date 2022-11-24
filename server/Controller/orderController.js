const Order = require('../models/orderModel');
const bidModel = require("../models/bidModel");
const axios = require("axios");


const createNewOrder = async(req, res) => {
   
    const order = new Order(req.body);
    try{
            const data = await order.save()
            console.log(data)
            const deliveryDate = new Date(data.deliveryAt);
            let setDate = deliveryDate.toLocaleDateString();
            const update = await bidModel.findByIdAndUpdate(req.body.offerid, {accepted: "true", orderId: data._id}, {new: true});
            let newData =  {orderId: data._id, msg: `Your Delivery Date has been updated to ${setDate}`, activityType: 'Delivery Time'};
            axios.post('http:localhost:7900/orderactivity/create', newData).then((response)=> {
            });
            // const response = await axios.get(`http:localhost:7900/api/user/${req.body.sellerId}`);
            
            let newData2 = {
              userId: data.assignedBy,
              message: `<a href="/user/manage/order/${data._id}" className="font-normal text-base text-black"><span className="font-medium text-base">You</span> created a new Order </a>`,
              read: 'false'
            }
            axios.post('http:localhost:7900/notification', newData2);
            let newData3 = {
                userId: data.assignedTo,
                message: `<a href="/user/manage/order/${data._id}" className="font-normal text-base text-black">A new <span className="font-medium text-base">Order</span> Order has been created </a>`,
                read: 'false'
            }
            axios.post('http:localhost:7900/notification', newData3);
            res.status(200).json(update);
        
    }catch(err){
        console.log(err);
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
      const order = await Order.findByIdAndUpdate({_id: req.params.id}, {delivered: "true"}, {new: true});
      res.status(200).json(order);
    }catch(err){
        res.status(400).json(err);
    }
}
const updateOrder = async(req, res) => {
    try{
    Order.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true}).then((data)=> {
        res.status(200).json(data);
    })
    }catch(err){
        console.log(err);
    }
}

const getBuyerOrdersByUserId = async(req, res) => {
    try{
      let data = await Order.find({assignedBy: req.params.id}).sort({createdAt: -1});
      res.status(200).json(data);
    }catch(err){
        res.status(400).json(err);
    }
}
const getSellerOrdersByUserId = async(req, res) => {
    try{
      let data = await Order.find({assignedTo: req.params.id}).sort({createdAt: -1});
      res.status(200).json(data);
    }catch(err){
        res.status(400).json(err);
    }
}

module.exports = {createNewOrder, getOrderById, addDelivery, updateOrder,getBuyerOrdersByUserId, getSellerOrdersByUserId };
