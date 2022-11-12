import React from 'react'
import Countdown from 'react-countdown';
import DeliverWork from './DeliverWork';
import Divider from '@mui/material/Divider';

const SellerOrderDetailsRight = ({orderDetails}) => {
  const date = new Date(orderDetails.createdAt)
  const date2  = addDays(orderDetails.createdAt, 10);
   console.log(orderDetails)



  return (
    <div className='w-25 p-2 mt-5'>
      <div className='delivery-container bg-white shadow-md rounded p-3'>
        <h5 className='text-left font-weight-normal my-1'>
          Time Left to deliver
        </h5>
        <div className='counter d-flex flex-row justify-content-center w-full my-2'>
          <h4 className=' font-weight-bold'>
            
          {(orderDetails && orderDetails.dealTime)? <Countdown date={(Date.now() + 24 * 60 * 60 * 1000 * parseInt(orderDetails.dealTime)-(Date.now()-date.getTime())) } />: null}
          </h4>
        </div>
        <div className='d-flex flex-row justify-content-center w-full'>
        <DeliverWork orderDetails={orderDetails}/>
        </div>
        <div className='d-flex flex-row justify-content-center w-full'>
        <button type="button" className="btn btn-link diplay-6">Extend Delivery Date</button>
        </div>
      </div>
      <div className='delivery-container bg-white shadow-md rounded p-3 mt-4'>
        <h4 className='font-weight-bold'>
          Order Details
        </h4>
        <div className='d-flex flex-row justify-content-between'>
          <p className='font-weight-normal h6 text-muted'>Ordered By</p>
          <p className='font-weight-normal h6'>{orderDetails.assignedBy}</p>
        </div>
        <div className='d-flex flex-row justify-content-between'>
          <p className='font-weight-normal h6 text-muted'>Delivery Date</p>
          <p className='font-weight-normal h6'>{date2.toLocaleDateString()}</p>
        </div>
        <div className='d-flex flex-row justify-content-between'>
          <p className='font-weight-normal h6 text-muted'>Total Price</p>
          <p className='font-weight-normal h6'>${orderDetails.budget}</p>
        </div>
        <div className='d-flex flex-row justify-content-between'>
          <p className='font-weight-normal h6 text-muted'>Order Number</p>
          <p className=' font-weight-normal h6'>{orderDetails._id}</p>
        </div>
      </div>
      <div className='notes-container bg-white p-3 mt-4 flex flex-row justify-between'>
        <div>
        <p className='font-semibold text-lg'>Private Note</p>
          <p className='font-normal text-gray-400'>Only Visible to You</p>
        </div>
        <div>
          <button className='text-green-600 font-semibold'>Add Note</button>
        </div>

      </div>
      <div className='bg-white p-3 mt-4'>
        <p className='font-semibold text-lg'>Feedback on the new order page?</p>
        <p className='text-blue-700 font-normal text-base'>Let us know what you think</p>
      </div>
      <div className='bg-white p-3 mt-4'>
        <p className='text-semibold text-lg font-bold'>Support</p>
        <div>
        <p className='font-semibold text-base'>FAQS</p>
        <p>Find Answers Needed</p>
        </div>
        <Divider sx={{bgcolor: "gray"}} />
        <div>
        <p className='font-semibold text-base'>Resolution Center</p>
        <p>Resolve Order Issues</p>
        </div>
      </div>
    </div>
  )
}

export default SellerOrderDetailsRight

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}