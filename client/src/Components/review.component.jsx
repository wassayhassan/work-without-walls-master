import React, { useState, useEffect } from 'react'
import { getUserById } from '../api'
import Rating from '@mui/material/Rating';
import { format } from 'timeago.js';
import Divider from '@mui/material/Divider';

const Review = ({review}) => {
    const [reviewerData, setReviewerData] = useState({})
    async function getReviewerData(id){
       const data = await getUserById(id);
       setReviewerData(data.data)
       console.log(data.data);
       return data.data;
    }
    useEffect(()=> {
       getReviewerData(review.reviewedBy)
    }, [review])
  return (
    <div className='border-[1px] rounded-md shadow-sm m-2 p-2 flex flex-'>
        <div className='w-16 p-2'>
           <div className='h-10 w-10 '>
            <img src={reviewerData.profileImg} className="object-contain rounded-full" alt="" />
           </div>
        </div>
        <div className='flex flex-col'>
        <div>
           <p>{reviewerData.name}</p>
        </div>
        <div className='flex flex-row'>
          <Rating name="read-only" value={review.overallRating} readOnly sx={{marginTop: 0.5}} />
          <Divider orientation="vertical" flexItem sx={{bgcolor: "black", width: '0.3px', margin: 0.4}} />
          <p className='mt-[0.3rem] ml-1'>{format(review.createdAt)}</p>
        </div>
        <div>
            <p>{review.comment}</p>
        </div>
        </div>
      
    </div>
  )
}

export default Review;