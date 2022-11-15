import React, {useState} from 'react';
import {Button} from 'flowbite-react';
import Snackbar from '@mui/material/Snackbar';
import { updateOrder, makeActivity } from '../../api';


export default function BuyerExtendDeliveryButton({orderDetails, days, setOpenExtend}) {
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
    const res = await updateOrder(orderDetails._id, {dealTime: parseInt(orderDetails.dealTime) + parseInt(days)})
    if(res.status === 200){
        setOpenExtend(false);
        const dat = await makeActivity({orderId: orderDetails._id, activityType: 'extendDays', msg: 'Buyer has extended the days of delivery'});
       handleClick();
    }
 }


  return (
    <div>
    <Button onClick={handleExtendDelivery}>
    Update
    </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Updated Delivery Days"
      />
    </div>
  );
}
