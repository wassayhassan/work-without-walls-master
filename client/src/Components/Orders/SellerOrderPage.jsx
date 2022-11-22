import React from 'react'
import SellerNavBar from '../navbars/sellerNavbar';
import SellerOrdersPageTab from './SellerOrderPageTab';
const SellerOrdersPage = () => {
  return (
    <div>
      <SellerNavBar />
      <div className='p-2'>
        <div className='mt-5 ml-3'>
          <p className='font-semibold text-lg'>Manage Orders</p>
        </div>
        <div className='ml-3'>
            <SellerOrdersPageTab />
        </div>
      </div>
    </div>
  )
}

export default SellerOrdersPage