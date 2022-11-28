import React, {useState, useEffect, useContext} from 'react'
import SellerNavBar from '../navbars/sellerNavbar'
import { Button } from 'flowbite-react'
import { UserContext } from '../../context/user.context'
import { createStripeAccount } from '../../api'

const Settings = () => {
    const {user} = useContext(UserContext);

   const handleCreateStripeAccount = async() => {
     const data ={
        userId: user._id
     }
      const res = await createStripeAccount(data);
      if(res.data){
        console.log(res.data.url.url);
        window.location = res.data.url.url;
      }
   }

  return (
    <div className='bg-gray-100'>
        <SellerNavBar />
        <div className='bg-white p-4'>
            <div>
                <p className='text-2xl font-bold'>Settings</p>
            </div>
            <div>
                <Button onClick={handleCreateStripeAccount}>Connect Stripe</Button>
            </div>

        </div>

    </div>
  )
}

export default Settings