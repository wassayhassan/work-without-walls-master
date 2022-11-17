const {Schema, model} = require("mongoose");
const orderMessageSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    title: {
        type: String
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String
    },
    attachments: {
        type: Array
    }
       
    ,
}, {timestamps: true});

const OrderMessage = model('OrderMessage', orderMessageSchema);
module.exports = OrderMessage