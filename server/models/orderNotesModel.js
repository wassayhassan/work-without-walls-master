const {model, Schema} = require("mongoose");

const OrderNoteSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'Order'
    },
    noteCreatorType: {
        type: String
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    msg: {
        type: String
    }

})
const OrderNote = model('Notes', OrderNoteSchema);
module.exports = OrderNote;