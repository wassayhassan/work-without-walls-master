import React from 'react'
import OrderMessage from './OrderMessage'

const OrderMessages = ({messages, orderDetails, user}) => {
  return (
    <div className=''>
      {messages && messages.map((message)=> {
        return <OrderMessage message={message} orderDetails={orderDetails} user={user} key={message._id} />
      })}

    </div>
  )
}

export default OrderMessages