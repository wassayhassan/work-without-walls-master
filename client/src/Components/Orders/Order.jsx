import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineCodeSandbox} from 'react-icons/ai'

const Order = ({order}) => {
    let date = new Date(order.createdAt);
  return (
    <NavLink to={`/user/manage/order/${order._id}`}>
        <div className='border-t-[1px] border-gray-200 p-1 h-10 flex flex-row justify-between'>
            <div className='flex flex-row'>
                <div className='flex flex-row justify-center items-center mr-1'>
                < AiOutlineCodeSandbox />
                </div>
                <p className='font-normal text-base text-blue-400 mx-1'>
                {order.title}
                </p>
            </div>
            <div>
                <p className='text-gray-400'>{date.toLocaleDateString()}</p>
            </div>


        </div>
    </NavLink>

    
  )
}

export default Order