import React from 'react'
import {AiOutlineDropbox} from 'react-icons/ai';
import ActivityAccordions from './ActivityAccordions';
import UserActivitiesAccordion from './UserActivitiesAccordions';


const SellerOrderActivities = ({orderDetails, sellerReview, buyerReview}) => {
  return (
    <div className='p-2'>
        <div className='bg-white shadow-md rounded-md p-3'>
          <div className='ml-3'>
          <p className='h4'>Order {orderDetails.status}</p>
          {orderDetails.status !== 'assigned'? <p className='text-muted text-lg'>Seller shared all the information to you</p>: null}
          </div>
        </div>
       <ActivityAccordions orderDetails={orderDetails} />
       <div>
        <UserActivitiesAccordion orderDetails={orderDetails} sellerReview={sellerReview} buyerReview={buyerReview} />
       </div>


    </div>
  )
}

export default SellerOrderActivities