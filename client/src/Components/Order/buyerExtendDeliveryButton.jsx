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

    Date.prototype.addDays = function(days) {
      var date = new Date(orderDetails.deliveryAt);
      date.setDate(date.getDate() + days);
      return date;
  }
  var date = new Date(orderDetails.deliveryAt);
  date = date.addDays(days);

    const res = await updateOrder(orderDetails._id, {deliveryAt: date,  dealTime: (parseInt(orderDetails.dealTime) + parseInt(days)) })
    if(res.status === 200){
        setOpenExtend(false);
        const dat = await makeActivity({orderId: orderDetails._id, activityType: 'extendDays', msg: `Your delivery date was updated to ${date.toLocaleDateString()}`});
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
