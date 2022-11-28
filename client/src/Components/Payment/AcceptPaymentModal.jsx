import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '../../context/user.context';
import {Modal, Button} from 'flowbite-react';
import {AddressElement, PaymentElement, useElements, useStripe, CardElement} from '@stripe/react-stripe-js';
import { createOrder } from '../../api';
import { createCheckoutSession } from '../../api';
const AcceptPaymentModal = ({acceptOpen, setAcceptOpen, paymentIntent, message, currentChat, setOfferOrderId, setAccepted}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [succeeded, setSucceeded] = useState(null);
    const [error, setError] = useState(false);
    const {user} = useContext(UserContext);

    async function handleAccept(){

      let data = {
        name: message.title,
        amount: message.budget,
        offerId: message._id
      }

      let response = await createCheckoutSession(data);
      console.log(response.data);

    //   Date.prototype.addDays = function(days) {
    //     var date = new Date(this.valueOf());
    //     date.setDate(date.getDate() + days);
    //     return date;
    // }
    // var date = new Date();
    // date = date.addDays(parseInt(message.dealTime));
    
    //   let dat = {
    //     title: message.title,
    //     payment: "true",
    //     conversationId: currentChat._id,
    //     assignedBy: message.assignedBy,
    //     offerid: message._id,
    //     description: message.offer,
    //     budget: message.budget,
    //     dealTime: message.dealTime,
    //     status: 'started',
    //     createdBy: message.senderId,
    //     assignedTo:  message.assignedTo,
    //     category: message.category,
    //     assigned: "true",
    //     completed: "false",
    //     canceled: 'false',
    //     deleted: 'false',
    //     deliveryAt: date
    //   }
    //     const data = await createOrder(dat);
    //     setOfferOrderId(data.data.orderId);
    //     setAccepted(true)
    //     setAcceptOpen(false);
     }

    const handleCheckout = async() => {
      //   const paymentResult = await stripe.confirmCardPayment(paymentIntent, {
      //       payment_method: {
      //         card: elements.getElement(CardElement),
      //         billing_details: {
      //           name: "Wassay Hassan",
      //         },
      //       },
      // });
      // console.log(paymentResult);
      // if(paymentResult.error){
      //   setError(paymentResult.error.message)
      // }else{
      //   switch(paymentResult.paymentIntent.status){
      //     case "succeeded":
      //         setSucceeded("Payment Successful");
      //         setError(null);
      //         handleAccept(message, currentChat, user);
      //         break;
      //   }
      // }
      
    }
  return (
    <div>
        <React.Fragment>


            <Modal
                show={acceptOpen}
                onClose={()=> setAcceptOpen(prev=> !prev)}
            >
                <Modal.Header>
                 Your card Information
                </Modal.Header>
                <Modal.Body>
                <div className="space-y-6">

                  <CardElement options={{defaultValue: {cvc: 212}}} />
                  <AddressElement options={{mode: 'billing'}} />
                </div>
                <p className='text-red-400 text-base font-semibold mt-2'>{error}</p>
                <p className='text-green-400 text-base font-semibold mt-2'>{succeeded}</p>
                
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={handleCheckout}>
                    Checkout
                </Button>
                <Button
                    color="gray"
                    onClick={()=> setAcceptOpen(prev=> !prev)}
                >
                    Decline
                </Button>
                </Modal.Footer>
            </Modal>
            </React.Fragment>
    </div>
  )
}

export default AcceptPaymentModal;

