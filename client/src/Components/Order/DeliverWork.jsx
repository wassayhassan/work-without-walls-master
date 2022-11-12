import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { addDelivery } from '../../api';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 4,
};

export default function DeliverWork({orderDetails}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [workfile, setWorkfile] = useState([]);
  const [workdesc, setWorkDesc] = useState("");
  
  function handleWorkChange(e){
    for(let i = 0; i < e.target.files.length; i++){
        let fil = e.target.files[i];
         setWorkfile((prev) => [...prev, fil]);
    }
  }
  function handleDescChange(e){
      setWorkDesc(e.target.value);
  }

  function handleSubmit(){
    let form = new FormData();
     form.append('description', workdesc);
     for(let i = 0; i < workfile.length; i++){
        form.append('file', workfile[i]);
     }
     let data = addDelivery(orderDetails._id, form);
     console.log(data);

  }


  return (
    <div>
      <button type="button" className="btn btn-success rounded" onClick={handleOpen}>Deliver Now</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="bg-white h-full w-2/3 p-2">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deliver Your Work
          </Typography>
           <div className='mt-5'>
              <textarea className='outline-none border-[1px] border-gray-200 w-4/5 rounded-md h-28 ' value={workdesc} onChange={handleDescChange} />
           </div>
           <div>
            <div>
                <label htmlFor="work" className='p-2  bg-gray-300 rounded-md cursor-pointer font-semibold'>Upload Work</label>
                <input type="file" name='work' id='work' hidden multiple onChange={handleWorkChange}/>
            </div>
           </div>
           <div className='flex flex-row justify-end'>
              <button className='p-2 bg-green-500 rounded-md text-white font-medium' onClick={handleSubmit}>Deliver</button>
           </div>
        </div>
      </Modal>
    </div>
  );
}