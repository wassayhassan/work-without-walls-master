import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { Button } from 'flowbite-react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { addDelivery } from '../../api';
import { UserContext } from "../../context/user.context";
import { getDeliveriesByOrderId } from '../../api';

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
  const [deliveries, setDeliveries] = useState([]);

    useEffect(()=> {
      if(orderDetails._id){
          const getDeliveries = async(id) => {
              let data =  await getDeliveriesByOrderId(id);
              setDeliveries(data.data)
      }
             getDeliveries(orderDetails._id)
      }
   
  }, [orderDetails._id])
  
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
     setOpen(false)
  }


  return (
    <div>
     {orderDetails.status !== 'completed' && orderDetails.cancelled !== "true" && deliveries.length > 0 && <Button onClick={handleOpen} color="success">Deliver Again</Button>} 
     { orderDetails.status !== 'completed' && orderDetails.cancelled !== "true" && deliveries.length < 1 && <Button onClick={handleOpen} color="success">Deliver Now</Button>}
      {orderDetails.status === "completed" && orderDetails.cancelled !== "true" && deliveries.length > 0 &&  <Button disabled={true}>Accepted Delivery</Button> }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style} className="bg-white rounded-md w-2/3 p-4">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Deliver Your Work
          </Typography>
           <div className='mt-5'>
            <p className='font-semibold text-lg'>Describe Your Work</p>
              <textarea className='outline-none border-[1px] border-gray-200 w-4/5 rounded-md h-28 ' value={workdesc} onChange={handleDescChange} />
           </div>
           <div>
            <div>
                <label htmlFor="work" className='p-2  bg-gray-300 hover:bg-gray-200 rounded-md cursor-pointer font-semibold'>Upload Work</label>
                <input type="file" name='work' id='work' hidden multiple onChange={handleWorkChange}/>
            </div>
           </div>
           <div className='flex flex-row justify-end'>
              <Button color="success" onClick={handleSubmit}>Deliver</Button>
           </div>
        </div>
      </Modal>
    </div>
  );
}