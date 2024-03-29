const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const ReviewModel = new Schema(
  {
    rtype: {
       type: String
    },
    teamId: {
      type: Schema.Types.ObjectId,
      ref: 'Teams'
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewOf: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    overallRating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review',ReviewModel);
module.exports = Review;
