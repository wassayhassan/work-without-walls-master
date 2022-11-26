import React, {useState, useEffect} from 'react'
import {Table } from 'flowbite-react'
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../../api';

const OrderTableRow = ({order}) => {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    let date = new Date(order.deliveryAt);

  async function handleClick(id){
     navigate(`/user/manage/order/${id}`)
  }

  async function getUser(id){
      const res = await getUserById(id);
      setData(res.data)
  }
  useEffect(()=> {
    if(order.assignedBy){
        getUser(order.assignedBy);
    }  
  }, [order])

  return (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {data.name}
            </Table.Cell>
            <Table.Cell onClick={()=> handleClick(order._id)} className="text-blue-400 font-normal cursor-pointer">
                {order.title}
            </Table.Cell>
            <Table.Cell>
                {date.toLocaleDateString()}
            </Table.Cell>
            <Table.Cell>
                ${order.budget}
            </Table.Cell>
            <Table.Cell>
               {order.status}
            </Table.Cell>
            </Table.Row>
  )
}

export default OrderTableRow