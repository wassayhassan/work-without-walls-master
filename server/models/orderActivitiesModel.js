const {Schema, model} = require("mongoose");

const orderActivitiesSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    msg: {
        type: String
    },
    activityType: {
       type: String
    },
    deliveryId: {
        type: Schema.Types.ObjectId,
        ref: 'Delivery'
     },
     reviewId: {
        type: Schema.Types.ObjectId,
        ref: 'Review'
     }
}, {
    timestamps: true
})
const OrderActivity = model('OrderActivity', orderActivitiesSchema);
module.exports = OrderActivity;