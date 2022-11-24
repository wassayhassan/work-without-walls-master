const OrderMessage = require("../models/orderMessagesModel");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const axios = require("axios")

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}

const createMessage = async(req, res) => {
    console.log(req.files)

    let attachments = []
    try{
        if(req.files === null){
            const dat = {
                orderId: req.params.id,
                title: req.body.title,
                senderId: req.body.senderId,
                receiverId: req.body.receiverId,
                message: req.body.message
            }
            
            const message = new OrderMessage(dat);
           
           message.save().then(async(data)=> {
            const response = await axios.get(`http:localhost:7900/api/user/${req.body.senderId}`);       
            console.log(response.data)
            let newData3 = {
                      userId: req.body.receiverId,
                      message: `<a href="/user/manage/order/${req.params.id}" className="font-normal text-base text-black">You received a new message from <span className="font-medium text-base">${response.data.name}</span>  </a>`,
                      read: 'false'
                  }
             const dati = await axios.post('http:localhost:7900/notification', newData3);
            res.status(200).json(data);
           })
           return;
        }
        if(req.files.file.length === undefined){
            let ext = getExtension(req.files.file.name);
            let name = uuidv4() +'.'+ ext; 
            attachments.push(name);    
            let uploadPath = path.join(__dirname , '..' , 'uploads' , name);
            req.files.file.mv(uploadPath, function(err) {
                if (err)  return res.status(500).send(err);
              });  
         }
        
        for(let i = 0; i < req.files.file.length; i++){         
            let fil = req.files.file[i];
            let ext = getExtension(req.files.file[i].name);
            let name = uuidv4() +'.'+ ext; 
            attachments.push(name);    
            let uploadPath = path.join(__dirname , '..' , 'uploads' , name);
            fil.mv(uploadPath, function(err) {
                if (err)  return res.status(500).send(err);
              });      
        }
        const dat = {
            orderId: req.params.id,
            attachments,
            title: req.body.title,
            senderId: req.body.senderId,
            receiverId: req.body.receiverId,
            message: req.body.message
        }
        
        const message = new OrderMessage(dat);
       
       const data = await message.save();
       const response = await axios.get(`http:localhost:7900/api/user/${req.body.senderId}`);       
       console.log(response.data)
       let newData3 = {
                 userId: req.body.receiverId,
                 message: `<a href="/user/manage/order/${req.params.id}" className="font-normal text-base text-black">You received a new message from <span className="font-medium text-base">${response.data.name}</span>  </a>`,
                 read: 'false'
             }
        const dati = await axios.post('http:localhost:7900/notification', newData3);
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(400).json(err);
    }
}
const getMessagesByOrderId = async(req, res) => {
    try{
        const messages = await OrderMessage.find({orderId: req.params.id});
        res.status(200).json(messages);
    }catch(err){
        res.status(400).json(err);
    }


}
module.exports = {createMessage, getMessagesByOrderId};