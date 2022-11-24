import  React, {useState, useContext} from 'react';
import {Button} from 'flowbite-react';
import Snackbar from '@mui/material/Snackbar';
import { updateOrder, makeActivity } from '../../api';
import { UserContext } from '../../context/user.context';
import axios from 'axios';


export default function OrderCancelSeller({orderDetails}) {
  const [open, setOpen] = useState(false);
  const {user} = useContext(UserContext)

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleRequestCancel = async() => {
    const res = await updateOrder(orderDetails._id, {status: 'Cancelled', cancelled: "true", cancelledAt: getCurrentTimeStamps()});
    if(res.status === 200){
        let dat = await makeActivity({orderId: orderDetails._id, msg: 'Seller has accepted the Order Cancellation Request', activityType: 'acceptCancel'});
        let newData3 = {
          userId: orderDetails.assignedBy,
          message: `<a href="/user/manage/order/${orderDetails._id}" className="font-normal text-base text-black"><span className="font-medium text-base">${user.firstname + ' ' + user.lastname}</span> has accepted your Order Cancellation Request </a>`,
          read: 'false'
      }
       const dati = await axios.post('/notification', newData3);
        handleClick();
    }
}


  return (
    <div>
      <Button onClick={handleRequestCancel}>Accept to Cancel</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Order Cancelled"
      />
    </div>
  );
}
function getCurrentTimeStamps(){
    var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  return dateTime;
}