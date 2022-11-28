import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import SellerNavbar from "../navbars/sellerNavbar";
import BuyerNavbar from "../navbars/BuyerNavbar";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../api";
import SellerOrderDetailsLeft from "./SellerOrderDetailsLeft";
import SellerOrderDetailsRight from "./SellerOrderDetailsRight";
const SellerOrderDetails = () => {
 
  const {user} = useContext(UserContext)
  const {id} = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  useEffect(()=> {
      async function getOrderDetails(id){
           const data = await getOrderById(id);
           setOrderDetails(data.data);
           console.log(data)
      }
      getOrderDetails(id);
  }, [])
  return (
    <div>
      {user._id === orderDetails.assignedTo? <SellerNavbar />: <BuyerNavbar />}
      
      <div className="d-flex flex-row bg-gray-100">
        <SellerOrderDetailsLeft orderDetails={orderDetails} />
        <SellerOrderDetailsRight orderDetails={orderDetails}  />
      </div>
        
    </div>
  )
}

export default SellerOrderDetails