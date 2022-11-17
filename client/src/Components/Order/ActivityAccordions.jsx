import React, {useState, useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderTable from './orderTable';
import { getMessage } from '../../api';
import { format } from 'timeago.js';


export default function ActivityAccordions({orderDetails, user}) {
  const [messages, setMessages] = useState([]);

  async function getPreviousMessages(id){
    const res = await getMessage(id);
    setMessages(res.data)
  }
  useEffect(()=> {
    if(orderDetails.conversationId){
      getPreviousMessages(orderDetails?.conversationId)
    }
    
  }, [orderDetails])
  return (
    <div>
      <Accordion>
        <AccordionSummary sx={{margin: 2}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant='h6'>Your recent inbox conversations with {orderDetails.assignedTo === user._id? 'Seller': 'Buyer'}</Typography>
        </AccordionSummary>
        <AccordionDetails>
         {messages && messages.map((message)=> {
            return (<div className='w-full he-10 flex flex-row flex-wrap ml-2 mb-1 p-1 border-gray-300 border-[1px] rounded'>
              <p className='font-medium text-base mx-2'>{message.sender === user._id? 'Me': 'Him'}: </p>
              <p className='text-gray-500 text-base mx-2'>{message.text}</p>
              <p className='text-sm font-light'>{format(message.createdAt)}</p>

            </div>)
         })}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary sx={{margin: 2}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant='h6'>Your Order Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
         <OrderTable orderDetails={orderDetails} />
        </AccordionDetails>
      </Accordion>

    </div>
  );
}
