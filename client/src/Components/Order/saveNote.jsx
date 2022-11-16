import React, {useState, useEffect} from 'react';
import {Button} from 'flowbite-react';
import Snackbar from '@mui/material/Snackbar';
import { createNote } from '../../api';


export default function SaveNote({orderDetails, user, setOpenSave, note}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const  handleCreateNote = async() => {
    let t = orderDetails.assignedBy === user._id? 'buyer': 'seller';
    let data = {
      orderId: orderDetails._id,
      creatorId: user._id,
      noteCreatorType: t,
      msg: note
    }
    let res = await createNote(data);
    if(res){
      setMessage(res.data.msg)
      handleClick();
    }
    setOpenSave(false)
 }

  return (
    <div>
      <Button className="m-1" onClick={handleCreateNote}>
                Save
              </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}