import React, {useEffect, useState, useContext} from 'react'
import {Button, Modal} from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import { updateOrder } from '../../api';
import { UserContext } from "../../context/user.context";
import { getDeliveriesByOrderId } from '../../api';
import { sendPayment } from '../../api';
import { getUserById } from '../../api';
import axios from 'axios';

const AcceptDeliveryConfirmation = ({orderDetails, setOpenBuyerReview}) => {
   const [open, setOpen] = useState(false);
   const { user } = useContext(UserContext);
   const [deliveries, setDeliveries] = useState([]);
 const handleOpen = () => {
    setOpen((prev)=> !prev)
 }
 const handleAccept = async() => {

     const data = await updateOrder(orderDetails._id, {completed: "true", completedAt: getCurrentDateTime(), status: "completed"});
     const res = await getUserById(orderDetails.assignedTo);

     let newData3 = {
               userId: orderDetails.assignedTo,
               message: `<a href="/user/manage/order/${orderDetails._id}" className="font-normal text-base text-black"><span className="font-medium text-base">${user.firstname + ' ' + user.lastname}</span> accepted the Order  </a>`,
               read: 'false'
        }
      const dati =  axios.post('/notification', newData3);
     setOpenBuyerReview(true);
     setOpen(false);
     const temp = {
        amount: orderDetails.budget,
        receiverStripeId: res.data.stripeAccount
     }
     const res2 = await sendPayment(temp);
 }
 console.log(orderDetails)

 useEffect(()=> {
    
     if(orderDetails._id){
         const getDeliveries = async(id) => {
             let data =  await getDeliveriesByOrderId(id);

             setDeliveries(data.data)
     }
  getDeliveries(orderDetails._id)
     }
  
 }, [orderDetails._id])
  return (

   
        <div>
        
        {orderDetails.cancelled === "true" && <Button disabled={true}>Cant be Delivered</Button>}
        {orderDetails.status !== "completed" && orderDetails.cancelled !== "true" && deliveries.length > 0 && <Button onClick={handleOpen} color="success">Accept Delivery </Button>}
        {orderDetails.status !== "completed" && orderDetails.cancelled !== "true" && deliveries.length < 1 && <Button disabled={true}>Waiting for Delivery</Button>}
        {orderDetails.status === "completed" && orderDetails.cancelled !== "true" &&  deliveries.length > 0 && <Button disabled={true}>Accepted Delivery</Button> }
   
     
  

    <Modal
        show={open}
        size="md"
        popup={true}
        onClose={handleOpen}
    >
        <Modal.Header />
        <Modal.Body>
        <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you pleased with the delivery and are ready to accept it?
            </h3>
            <div className="flex justify-center gap-4">
            <Button
                color="success"
                onClick={handleAccept}
            >
                Yes, I'm sure
            </Button>
            <Button
                color="gray"
                onClick={handleOpen}
            >
                No, cancel
            </Button>
            </div>
        </div>
        </Modal.Body>
    </Modal>
    </div>
  )
}
export default AcceptDeliveryConfirmation;


function getCurrentDateTime(){
    var currentdate = new Date(); 
var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    return datetime;
}
