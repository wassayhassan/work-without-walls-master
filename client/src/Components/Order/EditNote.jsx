import React, {useState} from 'react';
import {Button} from 'flowbite-react';
import Snackbar from '@mui/material/Snackbar';
import { updateNote } from '../../api';

export default function EditNote({note, setOpenEdit}) {
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

  const handleEditNote = async() => {
    const response = await updateNote(note._id, {msg: note.msg});
    if(response){
      setMessage(response.data.msg);
      handleClick();
      setOpenEdit(false);

    }
  
   }

  return (
    <div>
        <Button className="m-1" onClick={handleEditNote}>
            Edit
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
