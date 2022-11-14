import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from "../../context/user.context";
import { getDeliveriesByOrderId } from '../../api';
import DeliveryAccordions from './deliveryAccordions';
const Deliveries = ({orderDetails}) => {
    const { user } = useContext(UserContext);
    const [deliveries, setDeliveries] = useState([]);
    useEffect(()=> {
        if(orderDetails._id){
            const getDeliveries = async(id) => {
                let data =  await getDeliveriesByOrderId(id);
                setDeliveries(data.data)
        }
     getDeliveries(orderDetails._id)
        }
     
    }, [orderDetails._id])
  return (
    <div>

        <DeliveryAccordions deliveries={deliveries} />
    </div>
  )
}

export default Deliveries;