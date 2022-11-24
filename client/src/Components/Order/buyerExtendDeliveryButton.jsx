import React, {useState, useContext} from 'react';
import {Button} from 'flowbite-react';
import Snackbar from '@mui/material/Snackbar';
import { updateOrder, makeActivity } from '../../api';
import { UserContext } from '../../context/user.context';
import axios from 'axios';

export default function BuyerExtendDeliveryButton({orderDetails, days, setOpenExtend}) {
  const [open, setOpen] = useState(false);
  const {user} = useContext(UserContext);

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
      console.log(date.getDate() + 5);
      console.log(days)
      this.setDate(this.getDate() + parseInt(days));
      console.log(date)
      return this;
  }
  var date = new Date(orderDetails.deliveryAt);

  date.addDays(days);
  console.log(date);

    const res = await updateOrder(orderDetails._id, {deliveryAt: date,  dealTime: (parseInt(orderDetails.dealTime) + parseInt(days)) })
    if(res.status === 200){
        setOpenExtend(false);
        const dat = await makeActivity({orderId: orderDetails._id, activityType: 'extendDays', msg: `Your delivery date was updated to ${date.toLocaleDateString()}`});
        let newData3 = {
          userId: orderDetails.assignedTo,
          message: `<a href="/user/manage/order/${orderDetails._id}" className="font-normal text-base text-black"><span className="font-medium text-base">${user.firstname + ' ' + user.lastname}</span> extended the delivery time of Order </a>`,
          read: 'false'
      }
      const dati = await axios.post('/notification', newData3);
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
