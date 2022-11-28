import React, {useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/user.context';
import { getBidById } from '../../api';
import { getConversationByTwoUser } from '../../api';
import { createOrder } from '../../api';

const PaymentSucess = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const {id} = useParams();

    async function handleMakeOrder(){

        const re = await getBidById(id);
        const con = await getConversationByTwoUser(re.data.assignedBy, re.data.assignedTo);
        const bid = re.data;
        Date.prototype.addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
      }
      var date = new Date();
      date = date.addDays(parseInt(bid.dealTime));
      
        let dat = {
          title: bid.title,
          payment: "true",
          conversationId: con.data._id,
          assignedBy: bid.assignedBy,
          offerid: bid._id,
          description: bid.offer,
          budget: bid.budget,
          dealTime: bid.dealTime,
          status: 'started',
          createdBy: bid.senderId,
          assignedTo:  bid.assignedTo,
          category: bid.category,
          assigned: "true",
          completed: "false",
          canceled: 'false',
          deleted: 'false',
          deliveryAt: date
        }
          const res = await createOrder(dat);
          navigate(`/user/manage/order/${res.data.orderId}`)
          
    }
    useEffect(()=> {
        handleMakeOrder();
    })

  return ( 
    <div>

    </div>
  )
}

export default PaymentSucess