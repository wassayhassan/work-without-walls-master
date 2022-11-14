import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState, useEffect, useContext} from 'react';
import {BsCloudDownload} from "react-icons/bs";
import { getDeliveryById } from '../../api';
import { UserContext } from "../../context/user.context";
import Review from '../review.component';
import { getReviewById } from '../../api';

export default function IndividualActivity({activity, orderDetails, sellerReview, buyerReview}) {
    const { user } = useContext(UserContext);
    let ext;
    const [deliveryData, setDeliveryData] = useState({});
    const [reviewData, setReviewData] = useState(null);
    let date = new Date(activity.createdAt);
    
    
    useEffect(()=> {
        if(activity.activityType === "delivery"){
            async function getDeliveryData(id){
                let data = await getDeliveryById(id);
                setDeliveryData(data.data);
            }
            getDeliveryData(activity.deliveryId);
        }
    }, [activity._id])
    async function getReviewData(id){
        let data = await getReviewById(id);
        console.log(data.data)
        setReviewData(data.data);
    }

  useEffect(()=> {
    if(activity.activityType === "review"){
       getReviewData(activity.reviewId);
    }

  }, [activity])

  return (
      <Accordion sx={{marginY: 2, borderRadius: "5px"}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
            <div className='flex flex-row ml-3'>
            <p className='font-semibold text-lg text-gray-600'>{activity.msg}</p>
          <p className='m-2 '>{date.toUTCString()}</p>
            </div>

        </AccordionSummary>
        <AccordionDetails>
            {activity.activityType === 'delivery'?
             <div className='flex flex-row flex-wrap p-1'>
             {deliveryData && deliveryData.DeliveryMaterials && deliveryData.DeliveryMaterials.map((material, ix)=> {
             return (<div className='h-20 w-20 bg-gray-300 rounded-md m-1' key={ix}>
                 <div>
                     <p className='font-medium text-base'>{ext = getFileExtension(material)}</p>
                 </div>
                 <a href={`http://localhost:7900/uploads/${material}`} download>
                     <BsCloudDownload size="1.2em" />
                 </a>
                 </div>)
            })}
             </div>: null
        
        
        }
        {activity.activityType === "review" && reviewData && <Review review={reviewData} />}
   
        </AccordionDetails>
      </Accordion>
  );
}
const getFileExtension = (filename) => {
    return filename.split('.').pop();
}