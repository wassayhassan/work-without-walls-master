import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import { Button, Modal } from 'flowbite-react';
import Typography from '@mui/material/Typography';
import { Snackbar } from '@mui/material';
import { addDelivery } from '../../api';
import { UserContext } from "../../context/user.context";
import { getDeliveriesByOrderId } from '../../api';
import { AiFillAlipaySquare } from 'react-icons/ai';

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
  const [openNoti, setOpenNoti] = useState(false);
  const [message, setMessage] = useState('')
  const NhandleClose = () => setOpen(false);
  const [workfile, setWorkfile] = useState([]);
  const [workdesc, setWorkDesc] = useState("");
  const [deliveries, setDeliveries] = useState([]);
  const [deliverNotAllowed, setDeliveryNotAllowed] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenNoti(false);
  };


    useEffect(()=> {
      if(orderDetails._id){
          const getDeliveries = async(id) => {
              let data =  await getDeliveriesByOrderId(id);
              setDeliveries(data.data)
      }
             getDeliveries(orderDetails._id)
      }
   
  }, [orderDetails._id])
  useEffect(()=> {
    setDeliveryNotAllowed(isDeliveryNotAllowed(orderDetails));
  }, [orderDetails])
  
  function handleWorkChange(e){
    for(let i = 0; i < e.target.files.length; i++){
        let fil = e.target.files[i];
         setWorkfile((prev) => [...prev, fil]);
    }
  }
  function handleDescChange(e){
      setWorkDesc(e.target.value);
  }

  async function handleSubmit(){
    let form = new FormData();
     form.append('description', workdesc);
     for(let i = 0; i < workfile.length; i++){
        form.append('file', workfile[i]);
     }
     let res = await addDelivery(orderDetails._id, form);
     console.log(res)
     setMessage(res.data.msg);
     setOpenNoti(true)
     setOpen(false)
  }


  return (
    <div>
      <React.Fragment>
{orderDetails.status !== 'completed' && orderDetails.cancelled !== "true" && deliveries.length > 0 && <Button onClick={handleOpen} color="success">Deliver Again</Button>} 
     { orderDetails.status !== 'completed' && orderDetails.cancelled !== "true" && deliveries.length < 1 && <Button onClick={handleOpen} color="success">Deliver Now</Button>}
      {orderDetails.status === "completed" && orderDetails.cancelled !== "true" && deliveries.length > 0 &&  <Button disabled={true}>Accepted Delivery</Button> }
  <Modal
    show={open}
    onClose={NhandleClose}
  >
    

    <Modal.Body>
      <div>
        <p className='font-bold text-xl'>Deliver Your Work</p>
      </div>
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
              <Button onClick={()=> setOpen(false)}>Close</Button>
              <Button color="success" onClick={handleSubmit} disabled={deliverNotAllowed}>Deliver</Button>
                <Snackbar
                  open={openNoti}
                  autoHideDuration={3000}
                  onClose={handleClose}
                  message={message}
                />
           </div>
    </Modal.Body>
  </Modal>
</React.Fragment>
  
    </div>
  );
}
function isDeliveryNotAllowed(orderDetails){
  const startedDate = new Date(orderDetails.createdAt)
  const date = new Date();
  const deliveryDate = new Date(orderDetails.deliveryAt);
  console.log(date);
  console.log(startedDate)
  console.log(deliveryDate)
  if(date.getTime() >= startedDate.getTime() && date.getTime() <= deliveryDate.getTime()){
    return false

  }else{
    return true;
    
  }
}
