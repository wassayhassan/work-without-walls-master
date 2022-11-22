import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import { getSellerOrdersByUserId } from '../../api';
import { UserContext } from "../../context/user.context";
import Order from './Order';
import BuyerOrdersPage from './BuyerOrdersPage';
import { useNavigate } from 'react-router-dom';
export default function SellerOrdersModal() {
    const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleGoto(){
     navigate('/user/seller/orders');
  }

  async function getOrders(id){
    const res = await getSellerOrdersByUserId(id);
    console.log(res.data)
    setOrders(res.data);
  }
  useEffect(()=> {
    getOrders(user._id)
  }, [user])
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }} onClick={handleClick}>Orders</Typography>


      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'scroll',
            width:{
                lg: 350
            },
            height: {
                lg: 400
            },
            paddingTop: 1,
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className='p-1 flex flex-row justify-between'>
          <p className='font-semibold text-lg'>Orders</p>
          <div>
            <p className='cursor-pointer text-blue-400 font-medium' onClick={handleGoto}>Show All Order</p>
          </div>
        </div>
        <div>
          {orders && orders.map((order)=> {
            return <Order order={order} key={order._id} />
          })}
          {orders.length < 1? <p>No Orders Yet</p>: null}
        </div>
      </Menu>
    </React.Fragment>
  );
}