const {Schema, model} = require("mongoose");

const bidSchema = new Schema({
    mtype: {
        type: String
      },
    jobId: {
        type: Schema.Types.ObjectId,
        ref:'Job',
        required: true
    },
    title: {
        type: String
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String
    }
    ,
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    offer: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    dealTime: {
        type: Number,
        required: true
    },
    percentOff: {
        type: Number,
        required: true
    },
    accepted: {
        type: String,
        required: true
    },
    orderId: {
        type: String
    },
    category: {
        type: String
    }
}, {timestamps: true})
const bidModel = model('Bid', bidSchema);
module.exports = bidModel;