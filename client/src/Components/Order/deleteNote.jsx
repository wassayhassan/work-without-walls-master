import React, {useState}  from 'react';
import Snackbar from '@mui/material/Snackbar';
import { deleteNote } from '../../api';



export default function DeleteNote({note, setNote, openEdit}) {
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

  const handleDeleteNote = async() =>{
    const response = await deleteNote(note._id);
    if(response){
        setMessage(response.data.msg);
        setNote(''); 
        handleClick();
    }
    
}

  return (
    <div>
    {openEdit &&  <button className='text-green-600 font-semibold' onClick={handleDeleteNote}>Delete</button>}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}
