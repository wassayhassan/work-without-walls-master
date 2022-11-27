import React, {useState, useEffect, useContext} from 'react'
import SellerNavBar from '../navbars/sellerNavbar'
import { Divider } from '@mui/material'
import {Button} from 'flowbite-react';
import { startFinancialConnect } from '../../api';
import CircularProgress from '@mui/material/CircularProgress';
import { UserContext } from '../../context/user.context';
import { useStripe } from '@stripe/react-stripe-js';
import { addBank } from '../../api';
import { sendPayment } from '../../api';
const SellerEarning = () => {
  const stripe = useStripe();
  const {user} = useContext(UserContext);
  const [gettingSecret, setGettingSecret] = useState(false);
  const startLinking = async() => {
    setGettingSecret(true);
     const data = await startFinancialConnect(user);
     setGettingSecret(false);
     let clientSecret = data.data.client_secret;

     stripe.collectBankAccountToken({
      clientSecret
    }).then(async function(result) {
      if (result.error) {
      } else {
        if(result.token) {
          let tempData = {
            bankId: result.token.id,
            stripeAccountId: user.stripeAccount.id
          };
          const data = await addBank(tempData);
        }

      }
    });
  }

  const handleSendPayment = async() => {
    const tempData = {
      amount: 1000,
      stripeAccount: user.stripeAccount.id
    }
    const response = await sendPayment(tempData);
    console.log(response);
  }

  return (
    <div className='bg-gray-100'>
        <SellerNavBar />
        <div>
          <div className='p-5'>
            <p className='font-bold text-xl'>Earnings</p>
            <div className='w-full h-20 bg-white flex flex-row justify-between p-1'>
              <div className='flex flex-col p-2'>
                 <p className='text-gray-400  text-base font-normal'>Net Income</p>
                 <p className='font-semibold text-lg'>$100</p>
              </div>
              <Divider orientation='vertical' />
              <div className='flex flex-col  p-2'>
                 <p className='text-gray-400 text-base font-normal'>Widthdrawn</p>
                 <p className='font-semibold text-lg'>$100</p>
              </div>
              <Divider orientation='vertical' />
              <div className='flex flex-col  p-2'>
                 <p className='text-gray-400  text-base font-normal'>Available for Widthdraw</p>
                 <p className='font-semibold text-lg'>$100</p>
              </div>
            </div>
            <div className='flex flex-row justify-between mt-2'>
              <div className='flex flex-row'>
                <div className='flex flex-row justify-center items-center m-1'>
                <p className='font-medium text-lg'>WithDraw</p>
                </div>
                <Button onClick={handleSendPayment}>Bank Transfer</Button>

              </div>
              <div>
              {gettingSecret?  <Button disabled={true}> <CircularProgress size="2em"  /> Starting</Button>: null } 
               {gettingSecret? null: <Button onClick={startLinking}>Link Your Bank Account</Button>}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SellerEarning