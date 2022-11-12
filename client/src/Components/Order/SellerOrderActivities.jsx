import React from 'react'
import {AiOutlineDropbox} from 'react-icons/ai';
import ActivityAccordions from './ActivityAccordions';


const SellerOrderActivities = ({orderDetails}) => {
  return (
    <div className='p-2'>
        <div className='bg-white shadow-md rounded-md p-3'>
          <div className='ml-3'>
          <p className='h4'>Order Started</p>
            <p className='text-muted h6'>Seller shared all the information to you</p>
          </div>
        </div>
       <ActivityAccordions />

    </div>
  )
}

export default SellerOrderActivities