import React from 'react'
import ActivityAccordions from './ActivityAccordions';
import UserActivitiesAccordion from './UserActivitiesAccordions';
import OrderCancelSeller from './orderCancelSeller';


const SellerOrderActivities = ({orderDetails, sellerReview, buyerReview, user}) => {




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


    </div>
  )
}

export default SellerOrderActivities

