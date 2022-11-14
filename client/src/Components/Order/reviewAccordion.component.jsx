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

export default function ReviewAccordion({orderDetails, user}){

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
        
          let OR = (review.communication + review.service + review.buyagain)/ 3;
          let data = {
            ...review,
            rtype: "Buyer",
            reviewedBy: user._id,
            name: user.firstname + ' ' + user.lastname,
            reviewedTo: orderDetails.assignedTo,
            reviewOf: orderDetails._id
          }
          let response = await createReview(orderDetails._id, data);
        }
    return (
        <div>
                 <Accordion sx={{marginY: 2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6">Review</Typography>
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