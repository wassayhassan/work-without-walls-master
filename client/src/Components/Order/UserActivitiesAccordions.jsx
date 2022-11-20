import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Raect, {useState, useEffect, useContext} from 'react';
import { getActivitiesByOrderId } from '../../api';
import { UserContext } from "../../context/user.context";
import IndividualActivity from './IndividualActivity';
import ReviewAccordion from './reviewAccordion.component';
import BuyerReviewAccordion from './buyerReviewAccordion';

export default function UserActivitiesAccordion({orderDetails,setSellerReview, setBuyerReview , sellerReview, buyerReview}) {
  const [activities, setActivities] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(()=> {
    if(orderDetails._id){
      async function getActivities(id){
        let data = await getActivitiesByOrderId(id);
        setActivities(data.data)
      }
      getActivities(orderDetails._id);
    }

  }, [orderDetails._id])

  return (
    <div className='mt-2'>
      {activities && activities.map((activity)=> {
          return <IndividualActivity activity={activity} key={activity._id} orderDetails={orderDetails} sellerReview={sellerReview} buyerReview={buyerReview} />
      })}
      {(orderDetails.status === "completed" && orderDetails.assignedTo === user._id && buyerReview === null)? <ReviewAccordion orderDetails={orderDetails} setSellerReview={setSellerReview} setBuyerReview={setBuyerReview} sellerReview={sellerReview} buyerReview={buyerReview} user={user} />: null}
      {(orderDetails.status === "completed" && orderDetails.assignedTo !== user._id && sellerReview === null)? <BuyerReviewAccordion orderDetails={orderDetails}setSellerReview={setSellerReview} setBuyerReview={setBuyerReview} sellerReview={sellerReview} buyerReview={buyerReview} user={user} />: null}
    </div>
  );
}
