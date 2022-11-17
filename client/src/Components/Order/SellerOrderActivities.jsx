import React, {useState, useEffect} from 'react'
import ActivityAccordions from './ActivityAccordions';
import UserActivitiesAccordion from './UserActivitiesAccordions';
import OrderCancelSeller from './orderCancelSeller';
import { Textarea} from 'flowbite-react';
import {IoMdAttach} from 'react-icons/io';
import { Button } from '@mui/material';
import { createOrderMessage, getOrderMessages } from '../../api';
import OrderMessages from './orderMesages';


const SellerOrderActivities = ({orderDetails, sellerReview, buyerReview, user}) => {
  const [newmessage, setnewmessage] = useState('');
  const [newfiles, setnewfiles] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(()=> {
    getMessages(orderDetails._id);
  }, [orderDetails])

  async function getMessages(id){
      let res = await getOrderMessages(id);
      if(res.status === 200 || res.status === 304){
        setMessages(res.data)
      }

  }

  function handleAttachmentChange(e){
    for(let i = 0; i < e.target.files.length; i++){
        let fil = e.target.files[i];
         setnewfiles((prev) => [...prev, fil]);
    }
  }
  function handleMessageChange(e){
      setnewmessage(e.target.value);
  }

  async function handleSubmit(){
    console.log(user)
    let form = new FormData();
    let receiverId = orderDetails.assignedBy === user._id? orderDetails.assignedTo: orderDetails.assignedBy;
     form.append('message', newmessage);
     form.append('senderId', user._id);
     form.append('receiverId', receiverId);
     form.append('title', `${user.firstname + ' ' + user.lastname} sent a message`)
     for(let i = 0; i < newfiles.length; i++){
        form.append('file', newfiles[i]);
     }
     let res = await createOrderMessage(orderDetails._id, form);
     if(res.status === 200){
       setMessages((prev)=> [...prev, res.data]);
     }
  }

  return (
    <div className='p-2'>
         {orderDetails.assignedTo === user._id && orderDetails.cancelled === "false"?
          <div className='bg-white shadow-md rounded-md p-3 my-2'>
          <div className='ml-3'>
            <p className='h4'>Buyer has requested to cancel the order</p>
             <div className='flex flex-row justify-end'>
             <OrderCancelSeller orderDetails={orderDetails} />
             </div>
          </div></div>: null
        
        }
        <div className='bg-white shadow-md rounded-md p-3'>
       
          <div className='ml-3'>
          <p className='h4'>Order {orderDetails.status}</p>
          {orderDetails.status !== 'assigned' && orderDetails.assignedTo === user._id? <p className='text-muted text-lg'>Seller shared all the information to you</p>: null}
          </div>
        </div>
       <ActivityAccordions orderDetails={orderDetails} user={user} />
       <div>
        <UserActivitiesAccordion orderDetails={orderDetails} sellerReview={sellerReview} buyerReview={buyerReview} />
       </div>
       <div className='messages'>
         <OrderMessages messages={messages} orderDetails={orderDetails} user={user} />
       </div>
       <div className='newmessage'>
          <div>
            <Textarea onChange={handleMessageChange} rows={6} placeholder="Type Your Message here"/>
            <div className='mt-2 bg-white w-8 h-8 rounded-md flex flex-row justify-center items-center'>
              <label htmlFor='file' className='cursor-pointer'><IoMdAttach size="1.6em" /></label>
              <input type="file" id="file" hidden onChange={handleAttachmentChange} />
            </div>
            <div className='flex flex-row justify-end'>
            <Button  variant='outlined' onClick={handleSubmit}>Send</Button>
            </div>
          </div>
       </div>


    </div>
  )
}

export default SellerOrderActivities

