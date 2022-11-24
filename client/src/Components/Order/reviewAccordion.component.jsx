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
import axios from 'axios';

export default function ReviewAccordion({orderDetails, sellerReview, buyerReview, setBuyerReview,setSellerReview, user}){

    const [review, setReview] = useState({
        overallRating: 0,
        comment: ''
      })
        function handleRatingChange(e){
    
           
           let name = e.target.name;
           let value = e.target.value
           setReview({...review, [name]: value});
        }
       async function SubmitReview(){
          let data = {
            ...review,
            rtype: "Buyer",
            reviewedBy: user._id,
            name: user.firstname + ' ' + user.lastname,
            reviewedTo: orderDetails.assignedBy,
            reviewOf: orderDetails._id
          }
          console.log(setSellerReview)
          let response = await createReview(orderDetails._id, data);
          if(response){
            let newData3 = {
              userId: orderDetails.assignedBy,
              message: `<a href="/user/manage/order/${orderDetails._id}" className="font-normal text-base text-black"><span className="font-medium text-base">${user.firstname + ' ' + user.lastname}</span> left a review </a>`,
              read: 'false'
          }
          const dati = await axios.post('/notification', newData3);
            setBuyerReview(response.data);
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
          <Typography variant="h6">You can leave the Review here</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className=''>
        <div className='flex flex-row justify-between'>
          <div>
            <p className='font-medium text-lg'>Rating</p>
          </div>
          <Rating
              name="overallRating"
              value={review.overallRating}
              onChange={handleRatingChange}
            />
        </div>
        <div>
          <p className='font-semibold text-lg'>
            What was it like working with the Buyer?
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