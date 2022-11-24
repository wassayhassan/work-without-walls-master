import React, {useState, useContext} from 'react'
import {Button, Modal, Textarea} from 'flowbite-react';
import Rating from '@mui/material/Rating';
import { UserContext } from "../../context/user.context";
import { createReview } from '../../api';
import axios from 'axios';

const BuyerReviewModal = ({setOpenBuyerReview, openBuyerReview, orderDetails}) => {
  const { user } = useContext(UserContext);
  const [review, setReview] = useState({
    communication: 0,
    service: 0,
    buyagain: 0,
    comment: ''
  })

    function handleOpenChange(){
        setOpenBuyerReview((prev)=> !prev)
    }
    function handleRatingChange(e){

       
       let name = e.target.name;
       let value = e.target.value
       setReview({...review, [name]: value});
    }
   async function SubmitReview(){
      let OR = (parseInt(review.communication) + parseInt(review.service) + parseInt(review.buyagain)) /3;
      let data = {
        ...review,
        overallRating: OR,
        rtype: "Seller",
        reviewedBy: user._id,
        name: user.firstname + ' ' + user.lastname,
        reviewedTo: orderDetails.assignedTo,
        reviewOf: orderDetails._id
      }

      let response = await createReview(orderDetails._id, data);
      if(response.status === 200){
        let newData3 = {
          userId: orderDetails.assignedTo,
          message: `<a href="/user/manage/order/${orderDetails._id}" className="font-normal text-base text-black"><span className="font-medium text-base">${user.firstname + ' ' + user.lastname}</span> left a review </a>`,
          read: 'false'
      }
      const dati = await axios.post('/notification', newData3);
        handleOpenChange();
      }
    }
  return (
    <div className=''>
  <Modal style={{zIndex: 1000}}
    show={openBuyerReview}
    onClose={handleOpenChange}
    className=" max-h-screen"
  >
    <div className='overflow-y-scroll max-h-screen h-[33rem]'>
    <Modal.Header>
      Share you experience with the community to help make them better decisions
    </Modal.Header>
    <Modal.Body>
      <div className=''>
        <div className='flex flex-row justify-between'>
          <div>
            <p className='font-medium text-lg'>Communication With seller </p>
            <p className='text-gray-400 font-normal text-base'>How responsive was seller during the process</p>
          </div>
          <Rating
              name="communication"
              value={parseInt(review.communication)}
              onChange={handleRatingChange}
            />
        </div>
        <div className='flex flex-row justify-between'>
          <div>
            <p className='font-medium text-lg'>Service As Described </p>
            <p className='text-gray-400 font-normal text-base'>Did the result match the gigs description</p>
          </div>
          <Rating
              name="service"
              value={parseInt(review.service)}
              onChange={handleRatingChange}
            />
        </div>
        <div className='flex flex-row justify-between'>
          <div>
            <p className='font-medium text-lg'>Buy Again or Recommended</p>
            <p className='text-gray-400 font-normal text-base'>Would You Recommended Buying from this Seller</p>
          </div>
          <Rating
              name="buyagain"
              value={parseInt(review.buyagain)}
              onChange={handleRatingChange}
            />
        </div>
        <div>
          <p className='font-semibold text-lg'>
            What was it like working with the Seller?
          </p>
          <Textarea
              id="comment"
              name='comment'
              placeholder="Leave a comment..."
              required={true}
              rows={4}
              onChange={handleRatingChange}
              />
        </div>
      </div>

    </Modal.Body>
    <Modal.Footer>
      <Button onClick={SubmitReview}>
        Submit
      </Button>
      <Button
        color="gray"
        onClick={handleOpenChange}
      >
        Close
      </Button>
    </Modal.Footer>
    </div>
  
  </Modal>
</div>
  )
}

export default BuyerReviewModal