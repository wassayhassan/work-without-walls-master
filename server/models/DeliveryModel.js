const {Schema, model} = require("mongoose");

const deliverySchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    DeliveryMaterials: {
        type : Array,
        Material: {
            type: String
        }
    },
    Description: {
        type: String
    }
}, {timestamps: true});


const Delivery = model('Delivery', deliverySchema);
module.exports = Delivery;