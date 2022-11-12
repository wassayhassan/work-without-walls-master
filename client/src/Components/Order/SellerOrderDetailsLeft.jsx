import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SellerOrderActivities from './SellerOrderActivities';
import Divider from '@mui/material/Divider';
import OrderTable from './orderTable';

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
          <Typography>{children}</Typography>
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='w-75 p-2 gray'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: 2, marginLeft: 2 }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Activity" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SellerOrderActivities orderDetails={orderDetails}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
         <div className='p-3 mt-4 bg-white'>
          <div>
          <p className='font-bold text-lg'>I will develop and fix...</p>
          </div>
          <div>
            <p><span className='text-blue-700'>{orderDetails.assignedBy}</span></p>
          </div>
          <div>
            <p className='text-base'>Order number <span className='font-semiblod text-base'>#FFFFFFF</span></p>
          </div>
          <Divider />
          <div>
            <p>Order Page, Review and Feedback Page and connecting frontend and backend</p>
          </div>
          <div>
            <OrderTable orderDetails={orderDetails} />
          </div>
         </div>
      </TabPanel>
    </div>
  );
}