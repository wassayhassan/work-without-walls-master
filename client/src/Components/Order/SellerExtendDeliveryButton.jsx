import React, {useState} from 'react';
import {Button} from 'flowbite-react';
import Snackbar from '@mui/material/Snackbar';
import { makeActivity } from '../../api';


export default function SellerExtendDeliveryButton({orderDetails, days, setOpenExtend}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleExtendDelivery = async() => {

        
        const dat = await makeActivity({orderId: orderDetails._id, activityType: 'extendDays', msg: `Seller has Requested to extend the days of delivery by ${days} days`});
        setOpenExtend(false);
        handleClick();
 }


  return (
    <div>
    <Button onClick={handleExtendDelivery}>
    Send a Request
    </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Sent the Request"
      />
    </div>
  );
}
