import "./message.css";
import { format } from "timeago.js";
import { createOrder, updateBid } from "../../api";
import { useNavigate } from "react-router-dom";
import React, {useState, useContext} from "react";
import { UserContext } from "../../context/user.context";

export default function Message({currentChat, member, current, message, own }) {
  const [accepted, setAccepted] = useState(message.accepted === "true"? true: false);
  const [Withdraw, setWithdraw] = useState(message.status === "withdrawn"? true: false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const[offerOrderId, setOfferOrderId] = useState(message.orderId);



 async function handleAccept(){

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
var date = new Date();
date = date.addDays(parseInt(message.dealTime));

  let dat = {
    conversationId: currentChat._id,
    assignedBy: user._id,
    offerid: message._id,
    description: message.offer,
    budget: message.budget,
    dealTime: message.dealTime,
    status: 'started',
    createdBy: message.senderId,
    assignedTo: message.senderId,
    category: message.category,
    assigned: "true",
    completed: "false",
    canceled: 'false',
    deleted: 'false',
    deliveryAt: date
  }

    const data = await createOrder(dat);
    setOfferOrderId(data.data.orderId);
    setAccepted(true)

 }
 const handleOfferWithDraw = async() => {
     const data = await updateBid(message._id, {status: 'withdrawn'});
     console.log(data);
     setWithdraw(true);
 }




  if(message.mtype === "message"){
    return (
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src={
              member?.profileImg ||
              "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            } 
            alt=""
          />
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      </div>
    )
  }else{
    return (



<div className={(message.senderId === user._id) ? "flex justify-end w-full m-1": "flex flex-row justify-start w-start m-2"}>
<div className={(message.senderId === user._id) ? "flex flex-row-reverse w-2/3": "flex w-2/3 flex-row"}>
  <div>
  <img
    className="messageImg"
    src={
      member?.profileImg ||
      "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
    } 
    alt=""
  />
  <div className="messageBottom">{format(message.createdAt)}</div>
  </div>

        <div className="card p-1" style={{width: "25rem"}}>
        <div className="card-body">
          <h4 className="card-title">Seller Offer</h4>
          <h6>Description</h6>
          <p className="card-text">{message.offer}</p>
          {/* <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a> */}
        </div>
        <div className="ml-3">
          <h5>Offer Includes</h5>
          <li> {message.dealTime} days delivery</li>
          <li>{message.percentOff} % Off</li>
          <li>${message.budget}</li>
        </div>
        <div className="d-flex flex-row justify-content-end">
       {accepted && <button type="button" className="btn btn-dark" onClick={()=> navigate(`/user/manage/order/${offerOrderId}`)}>View Order</button>}
        {(message.senderId === user._id? <button type="button" className="btn btn-light" onClick={handleOfferWithDraw} disabled={Withdraw}>{Withdraw? 'Withdrawn': 'Withdraw Offer'}</button>:<button type="button" className="btn btn-light" onClick={handleAccept} disabled={accepted}>{accepted? 'Accepted': 'Accept'}</button>)}
        </div>
      </div>
  
</div>
</div>
    )
  }

}
