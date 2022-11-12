const Delivery = require('../models/DeliveryModel');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

function getExtension(filename) {
    var ext = path.extname(filename||'').split('.');
    return ext[ext.length - 1];
}


const addDelivery = async(req, res) => {
     const {file} = req.files;
     let DeliveryMaterials = [];


    try{
        
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
        console.log(dat)
        
       const delivery = new Delivery(dat);
       
       delivery.save().then((data)=> {
        console.log(data);
        res.status(200).json(data);
       })
    }catch(err){
        res.status(400).json(err);

    }
}
module.exports = {addDelivery};