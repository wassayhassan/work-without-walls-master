import React from 'react'
import parse from 'html-react-parser';
import { format } from 'timeago.js';

const Notification = ({notification}) => {
    let read = 'border-t-[1px] border-gray-200 p-1 h-14 flex flex-row justify-between hover:bg-blue-200';
    let unread  = "border-t-[1px] border-gray-200 p-1 h-14 flex flex-row justify-between hover:bg-blue-200 bg-blue-100"
  return (

    <div className={(notification.read === 'true')? read: unread}>
        <div className='flex flex-row w-3/4'>

            <p className='font-normal text-base text-blue-400 mx-1 hover:text-blue-500'>
              {parse(notification.message)}
            </p>
        </div>
        <div>
            <p className='text-gray-400 text-xs font-light'>{format(notification.createdAt)}</p>
        </div>


    </div>
  )
}

export default Notification