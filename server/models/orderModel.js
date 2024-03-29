const {Schema, model} = require("mongoose");


const orderSchema = new Schema({
    description: {
        type: String,
        default: "",
      },
      payment: {
        type: String
      },
      paymentIntentId: {
        type: String
      },
      teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Teams'
      },
      title: {
        type: String
      },
      dealTime: {
        type: String,
      },
      conversationId: {
         type: String
      },
      budget: {
        type: Number,
        default: "",
      },
      status: {
        type: String,
        enum: [
          "started",
          "active",
          'delivered',
          'Requested Cancel',
          "inactive",
          "assigned",
          "completed",
          "Cancelled",
          "closed",
          "deleted",
        ],
        default: "active",
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      assignedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      deliveryAt: {
        type: String
      },
      assignedTo: {
        type: Schema.Types.ObjectId,
        default: "",
        ref: "User",
      },
      category: {
        type: String,
        default: "",
      },
      img1: {
        type: String,
        default: "",
      },
      assignedAt: {
        type: String,
        default: "",
      },
      assigned: {
        type: String,
        default: "",
      },

      completedAt: {
        type: String,
        default: "",
      },
      completed: {
        type: String,
        default: "",
      },
      cancelledAt: {
        type: String,
        default: "",
      },
      cancelled: {
        type: String,
        default: "",
      },
      deletedAt: {
        type: String,
        default: "",
      },
      deleted: {
        type: String,
        default: "",
      },
      options: {
        type: String,
        default: "",
      },
      Sellerreview: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      BuyerReview: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
 {timestamps: true}
 
 );

 const Order = model('Order', orderSchema);
 module.exports = Order;