import React, {useState, useEffect } from 'react'
import { getUserById } from '../../api';

const OrderDetails = ({orderDetails, date, date2}) => {
    const [data, setData] = useState({});
    async function getUser(id){
        const res = await getUserById(id);
        setData(res.data)
    }
    useEffect(()=> {
        getUser(orderDetails.assignedBy)
    }, [orderDetails])
  return (
    <div className='delivery-container bg-white shadow-md rounded p-3 mt-4'>
        <h4 className='font-weight-bold'>
        Order Details
        </h4>
        <div className='d-flex flex-row justify-content-between'>
            <p className='font-weight-normal text-muted text-sm'>Ordered By</p>
            <p className=' font-semibold text-sm'>{data.name}</p>
            </div>
            <div className='d-flex flex-row justify-content-between'>
            <p className='font-weight-normal text-muted text-sm'>Delivery Date</p>
            <p className=' font-semibold text-sm'>{date2.toLocaleDateString()}</p>
            </div>
            <div className='d-flex flex-row justify-content-between'>
            <p className='font-weight-normal text-muted text-sm'>Total Price</p>
            <p className=' font-semibold text-sm'>${orderDetails.budget}</p>
            </div>
            <div className='d-flex flex-row justify-content-between'>
            <p className='font-weight-normal text-muted text-sm'>Order No. </p>
            <p className=' font-semibold text-sm'>{orderDetails._id}</p>
        </div>
    </div>
  )
}

export default OrderDetails