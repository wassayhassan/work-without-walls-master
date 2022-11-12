import React from 'react'
import {AiOutlineDropbox} from 'react-icons/ai';
import ActivityAccordions from './ActivityAccordions';


const SellerOrderActivities = ({orderDetails}) => {
  return (
    <div className='p-2'>
        <div className='bg-white shadow-md rounded-md p-2 '>
            <p className='h4'>Order Started</p>
            <p className='text-muted h6'>Seller shared all the information to you</p>
        </div>
        <div>
          <p>Your recent inbox conversations with ayeshabajwa563</p>
        </div>
        <div className='p-2 d-flex flex-row bg-white shadow-md rounded-md mt-2'>
            <AiOutlineDropbox size="1.4em"/>
            <p className='h5'>Your Order Details</p>
        </div>
        <div className='activities-container'></div>

    </div>
  )
}

export default SellerOrderActivities