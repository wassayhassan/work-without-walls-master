import React, {useState, useEffect, useContext} from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import { getNotificationsByUserId } from '../../api';
import Tooltip from '@mui/material/Tooltip';
import {IoMdNotifications} from 'react-icons/io';
import { UserContext } from "../../context/user.context";
import Notification from './Notification.component';
import { updateNotification } from '../../api';


export default function NotifcationModal() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [readNotificationCount, setReadNotificationCount] = useState(0);
  const open = Boolean(anchorEl);
  const handleClick = async(event) => {
    setAnchorEl(event.currentTarget);
    notifications.forEach(async(notification)=> {
        let newData = await updateNotification(notification._id, {read: 'true'});
    })
  };

  async function getNotifications(id){
     const res = await getNotificationsByUserId(id);
     if(res.status !== 400){
        setNotifications(res.data);
        res.data.forEach((noti)=> {
            if(noti.read === "false"){
                setReadNotificationCount(prev=> prev + 1);
            }
        })
        setNotificationCount(res.data.length);
     }
  }
  useEffect(()=> {
    setReadNotificationCount(0);
    setNotificationCount(0);
    setNotifications([]);
    getNotifications(user._id)
  }, [user])
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Notifcation">

         <Badge color="secondary" badgeContent={readNotificationCount}>
          <IoMdNotifications color='white' size="1.4em" onClick={handleClick} />
         </Badge>
          
        </Tooltip>
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
            width: {
                lg: 350,
            },
            height: {
               lg: 400,
            },
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
          <p className='font-semibold text-lg'>Notifications</p>
          <div>
            {/* <p className='cursor-pointer text-blue-400 font-medium' onClick={handleGoto}>Show All Order</p> */}
          </div>
        </div>
        <div className='flex flex-col'>
          {notifications && notifications.map((notification)=> {
            return <Notification notification={notification} key={notification._id} />
          })}

              {notificationCount < 1? <p className='text-base'>No Notifications Yet</p>: null}
        </div>
     
      </Menu>
    </React.Fragment>
  );
}