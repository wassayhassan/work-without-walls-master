import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineCodeSandbox} from 'react-icons/ai'
import {format} from 'timeago.js'

const Order = ({order}) => {

  return (
    <NavLink to={`/user/manage/order/${order._id}`}>
        <div className='border-t-[1px] border-gray-200 p-1 h-10 flex flex-row justify-between hover:bg-blue-200 '>
            <div className='flex flex-row'>
                <div className='flex flex-row justify-center items-center mr-1'>
                < AiOutlineCodeSandbox />
                </div>
                <p className='font-normal text-base text-blue-400 mx-1 hover:text-blue-500'>
                {order.title}
                </p>
            </div>
            <div>
                <p className='text-gray-400'>{format(order.createdAt)}</p>
            </div>


        </div>
    </NavLink>

    
  )
}

export default Order