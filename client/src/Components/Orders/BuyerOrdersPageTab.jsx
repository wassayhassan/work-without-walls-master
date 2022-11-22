import React, {useState, useEffect, useContext} from 'react'
import { Tabs } from 'flowbite-react'
import { UserContext } from "../../context/user.context";
import BuyerOrdersTable from './BuyerOrdersTable';
import { getBuyerOrdersByUserId } from '../../api';

const BuyerOrdersPageTab = () => {
    const { user } = useContext(UserContext);
    const [activeOrders, setActiveOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [cancelledOrders, setCancelledOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    async function getOrders(id){
        const res = await getBuyerOrdersByUserId(id);
        res.data.forEach((order)=> {
            if(order.status === 'started'){
                setActiveOrders((prev)=> [...prev, order]);
            }
            if(order.status === 'Cancelled'){
                setCancelledOrders((prev)=> [...prev, order]);
            }
            if(order.status === 'completed'){
                setCompletedOrders((prev)=> [...prev, order])
            }
            if(order.status === 'delivered'){
                setDeliveredOrders((prev)=> [...prev, order])
            }
        })
      }
      useEffect(()=> {
        setActiveOrders((prev)=> []);
        setDeliveredOrders((prev)=> []);
        setCancelledOrders((prev)=> []);
        setCompletedOrders((prev)=> [])
        getOrders(user._id)
      }, [user])
    
  return (
    <div>
        <Tabs.Group
                aria-label="Tabs with underline"
                style="underline"
                >
                <Tabs.Item title="Active" active={true}>
                    <div>
                        <div>
                            <p className='font-medium text-base'>Active Orders</p>
                        </div>
                       <BuyerOrdersTable orders={activeOrders} />
                    </div>
                </Tabs.Item>
                <Tabs.Item
                    
                    title="Delivered"
                >
                     <div>
                        <div>
                            <p className='font-medium text-base'>Delivered Orders</p>
                        </div>
                       <BuyerOrdersTable orders={deliveredOrders} />
                    </div>  
                </Tabs.Item>
                <Tabs.Item title="Completed">
                  <div>
                        <div>
                            <p className='font-medium text-base'>Completed Orders</p>
                        </div>
                       <BuyerOrdersTable orders={completedOrders} />
                    </div>   
                </Tabs.Item>
                <Tabs.Item title="Cancelled">
                <div>
                        <div>
                            <p className='font-medium text-base'>Cancelled Orders</p>
                        </div>
                       <BuyerOrdersTable orders={cancelledOrders} />
                    </div> 
                </Tabs.Item>
                </Tabs.Group>
    </div>
  )
}

export default BuyerOrdersPageTab