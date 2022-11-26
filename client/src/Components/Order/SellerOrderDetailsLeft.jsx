import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SellerOrderActivities from './SellerOrderActivities';
import Divider from '@mui/material/Divider';
import OrderTable from './orderTable';
import { UserContext } from "../../context/user.context";
import Deliveries from './Deliveries.component';
import {useState, useEffect, useContext} from 'react';
import { getReviewsByOrderId } from '../../api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SellerOrderDetailsLeft({orderDetails}) {
  const {user} = useContext(UserContext);
  const [value, setValue] = React.useState(0);
  const [buyerReview, setBuyerReview] = useState(null);
  const [sellerReview, setSellerReview] = useState(null);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  async function getReviews(id){
     let data = await getReviewsByOrderId(id);
     data.data.forEach((r)=> {
      if(r.rtype === "Seller"){
        setSellerReview(r);
      }else{
        setBuyerReview(r);
      }
     })
  }
  useEffect(()=> {
    if(orderDetails._id){
      getReviews(orderDetails._id);
    }
    
  }, [orderDetails])

  return (
    <div className='w-75 p-2 gray'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2, marginLeft: 2 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Activity" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
          <Tab label="Deliveries" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <SellerOrderActivities user={user} orderDetails={orderDetails} setSellerReview={setSellerReview} setBuyerReview={setBuyerReview} sellerReview={sellerReview} buyerReview={buyerReview}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
         <div className='p-3 mt-4 bg-white'>
          <div>
          <p className='font-bold text-lg'>I will develop and fix...</p>
          </div>
          <div>
            <p className='text-base'>Buyer<span className='text-blue-700 mx-2'>{orderDetails.assignedBy}</span></p>
          </div>
          <div>
            <p className='text-base'>Order number <span className='font-semibold text-base'>#{orderDetails._id}</span></p>
          </div>
          <Divider />
          <div>
            <p>{orderDetails.description}</p>
          </div>
          <div>
          {orderDetails && orderDetails.budget && <OrderTable orderDetails={orderDetails} /> }  
          </div>
         </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
         <Deliveries orderDetails={orderDetails} />
      </TabPanel>
    </div>
  );
}