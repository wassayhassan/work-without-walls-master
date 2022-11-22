import React from 'react'
import BuyerNavbar from "../navbars/BuyerNavbar";
import BuyerOrdersPageTab from './BuyerOrdersPageTab';
const BuyerOrdersPage = () => {
  return (
    <div>
      <BuyerNavbar />
      <div className='p-2'>
      <div className='mt-5 ml-3'>
          <p className='font-semibold text-lg'>Manage Orders</p>
        </div>
        <div>
            <BuyerOrdersPageTab />
        </div>
      </div>
    </div>
  )
}

export default BuyerOrdersPage