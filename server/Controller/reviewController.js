const Review = require('../models/review.Model');

const createReview = async(req, res) => {
  const review = new Review(req.body);
  try{
    review.save().then((data)=> {
        res.status(200).json(data);
    })
  }catch(err){
    res.status(500).json(err);
  }
}
const getReviewsByUserId = async(req, res)=> {
    try{
        const reviews  = await Review.find({reviewedTo: req.params.id});
        res.status(200).json(err);
    }catch(err){
        res.status(500).json(err)
    }

}
module.exports = {createReview, getReviewsByUserId}