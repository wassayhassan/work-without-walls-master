import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState, useEffect, useContext} from 'react';
import {Button, Modal, Textarea} from 'flowbite-react';
import Rating from '@mui/material/Rating';
import { createReview } from '../../api';

export default function BuyerReviewAccordion({orderDetails, buyerReview, sellerReview, setBuyerReview,setSellerReview, user}){
    const [review, setReview] = useState({
        communication: 0,
        service: 0,
        buyagain: 0,
        comment: ''
      })

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
          if(response){ 
            setSellerReview(response.data);
          }
        }
    return (
        <div>
                 <Accordion sx={{marginY: 2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">You can give the Review here</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
      <div className='flex flex-row justify-end m-2'>
        <Button onClick={SubmitReview}>Submit</Button>
      </div>
 
       
        </AccordionDetails>
      </Accordion>

        </div>
        
    )
};