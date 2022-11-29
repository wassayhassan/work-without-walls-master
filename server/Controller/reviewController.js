const Review = require('../models/review.Model');
const axios = require("axios");

const createReview = async(req, res) => {
  const review = new Review(req.body);
  try{
    review.save().then((data)=> {
        let newData =  {orderId: data.reviewOf, msg: req.body.name + ' gave a Review', activityType: 'review', reviewId: data._id};
        axios.post('http:localhost:7900/orderactivity/create', newData).then((response)=> {
        })
        res.status(200).json(data);
    })
  }catch(err){
    res.status(500).json(err);
  }
}
const getReviewsByUserId = async(req, res)=> {
    try{
        const reviews  = await Review.find({reviewedTo: req.params.id});
        res.status(200).json(reviews);
    }catch(err){
        res.status(500).json(err)
    }
}
const getReviewsByOrderId = async(req, res)=> {
  try{
      const reviews  = await Review.find({reviewOf: req.params.id});
      res.status(200).json(reviews);
  }catch(err){
      res.status(500).json(err)
  }
}
const getReviewById = async(req, res) => {
  try{
     const review = await Review.findOne({_id: req.params.id});
     res.status(200).json(review);
  }catch(err){
    res.status(400).json(err);
  }
}
const getReviewsByTeamId = async(req, res)=> {
  try{
    const review = await Review.find({teamId: req.params.id});
    res.status(200).json(review);
  }catch(err){
    res.status(400).json(err);
  }
}
module.exports = {createReview, getReviewsByUserId, getReviewsByOrderId, getReviewById,  getReviewsByTeamId}