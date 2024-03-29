const Delivery = require('../models/DeliveryModel');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const axios = require("axios");

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}


const addDelivery = async(req, res) => {
     

     let DeliveryMaterials = [];
    try{
        const {file} = req.files;
        if(file.length === undefined){
            let ext = getExtension(file.name);
            let name = uuidv4() +'.'+ ext; 
            DeliveryMaterials.push(name);    
            let uploadPath = path.join(__dirname , '..' , 'uploads' , name);
            file.mv(uploadPath, function(err) {
                if (err)  return res.status(500).send(err);
              });  
         }
        
        for(let i = 0; i < file.length; i++){         
            let fil = file[i];
            let ext = getExtension(file[i].name);
            let name = uuidv4() +'.'+ ext; 
            DeliveryMaterials.push(name);    
            let uploadPath = path.join(__dirname , '..' , 'uploads' , name);
            fil.mv(uploadPath, function(err) {
                if (err)  return res.status(500).send(err);
              });      
        }
        const dat = {
            orderId: req.params.id,
            DeliveryMaterials,
            Description: req.body.description
        }
        
       const delivery = new Delivery(dat);
       
       delivery.save().then(async(data)=> {
        const response = await axios.get(`http:localhost:7900/api/user/${req.body.sellerId}`);
        let newData =  {orderId: req.params.id, msg: `${response.data.name} sent a Delivery`, activityType: 'delivery', deliveryId: data._id};
        axios.post('http:localhost:7900/orderactivity/create', newData).then((response)=> {
        })
        axios.post(`http:localhost:7900/order/${req.params.id}/update`, {status: 'delivered'}).then(()=> {

        })
        
        let newData2 = {
          userId: req.body.receiverId,
          message: `<a href="/user/manage/order/${req.params.id}" className="font-normal text-base text-black"><span className="font-medium text-base">${response.data.name}</span> sent a delivery </a>`,
          read: 'false'
        }
        axios.post('http:localhost:7900/notification', newData2);
        res.status(200).json({msg: "Delivery has been sent to Buyer"});
       })
    }catch(err){
        res.status(400).json({msg: err});

    }
}
const getDeliveriesByOrderId = async(req, res) => {
     try{
        let deliveries = await Delivery.find({orderId: req.params.id});
        res.status(200).json(deliveries);
     }catch(err){
        res.status(400).json(err);
     }
}
const getDeliveryById = async(req, res) => {
    try{
        let delivery = await Delivery.findOne({_id: req.params.id});
        res.status(200).json(delivery)
    }catch(err){
        res.status(400).json(err);
    }
}
module.exports = {addDelivery, getDeliveriesByOrderId, getDeliveryById};