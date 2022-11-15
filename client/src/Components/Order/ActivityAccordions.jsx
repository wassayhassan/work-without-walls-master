import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderTable from './orderTable';


export default function ActivityAccordions({orderDetails, user}) {
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
          <Typography>
               You can go to messages to view your most recent messages
          </Typography>
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
