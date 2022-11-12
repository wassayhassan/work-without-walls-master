const {Schema, model} = require("mongoose");

const orderActivitiesSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    msg: {
        type: String
    }
}, {
    timestamps: true
})
const OrderActivity = model('OrderActivity', orderActivitiesSchema);
module.exports = OrderActivity;