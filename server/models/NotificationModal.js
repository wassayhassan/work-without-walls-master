const {Schema, model} = require("mongoose");

const NotificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
      type: String,
    },
    read: {
        type: String
    },    
}, {
    timestamps: true
})
const Notification = model('Notifications', NotificationSchema);

module.exports = Notification;