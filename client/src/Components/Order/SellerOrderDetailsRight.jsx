import React, {useContext, useState} from 'react'
import Countdown from 'react-countdown';
import DeliverWork from './DeliverWork';
import Divider from '@mui/material/Divider';
import { UserContext } from "../../context/user.context";
import AcceptDeliveryConfirmation from './AcceptDeliveryConfirmation';
import ReviewModal from './ReviewModal';
import { getNotesByOrderId, getDeliveriesByOrderId} from '../../api';
import { Textarea, Button } from 'flowbite-react';
import { useEffect } from 'react';
import SaveNote from './saveNote';
import DeleteNote from './deleteNote';
import EditNote from './EditNote';
import CancelModal from './cancelModal';
import BuyerExtendDelivery from './buyerExtendDelivery';
import SellerExtendDelivery from './SellerExtendDelivery';
import TrackOrder from './TrackOrder';
import OrderDetails from './orderDetails';


const SellerOrderDetailsRight = ({orderDetails}) => {
  const { user } = useContext(UserContext);
  const [deliveries, setDeliveries] = useState([]);
  const [openBuyerReview, setOpenBuyerReview] = useState(false);
  const [note, setNote] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openSave, setOpenSave] = useState(false)
  const [openNotepad, setOpenNotepad] = useState(false);

  const date = new Date(orderDetails.createdAt)
  const date2  = addDays(orderDetails.createdAt, 10);

 function handleNoteChange(e){
    setNote(e.target.value);
 }


 useEffect(()=> {
    
  if(orderDetails._id){
      const getDeliveries = async(id) => {
          let data =  await getDeliveriesByOrderId(id);

          setDeliveries(data.data)
  }
getDeliveries(orderDetails._id)
  }

}, [orderDetails._id])

 async function getNotes(id){
  let response = await getNotesByOrderId(id);
  response.data.forEach((not)=> {
    if(not.noteCreatorType === 'seller' && user._id === orderDetails.assignedTo){
         setNote(not);
         setOpenNotepad(true);
    }
    else if(not.noteCreatorType === 'buyer' && user._id === orderDetails.assignedBy){
      setNote(not)
       setOpenNotepad(true);
    }
  })
 }
const handleOpenSave = () => {
  setOpenNotepad(true);
  setOpenSave(true);
 }
 const handleEditOpen = () => {
  setOpenNotepad(true);
  setOpenEdit(true);
 }

 const handleCancel = () => {
  setOpenEdit(false);
 }

 useEffect(()=> {

    getNotes(orderDetails._id)

 }, [orderDetails])


  return (
    <div className='w-25 p-2 mt-5'>
      <div className='delivery-container bg-white shadow-md rounded p-3'>
        <h5 className='text-left font-weight-normal my-1'>
          {(orderDetails.assignedTo === user._id)? 'Time left to be delivered': 'Time Left to deliver'}
        </h5>
        <div className='counter d-flex flex-row justify-content-center w-full my-2'>
          <h4 className=' font-weight-bold'>
            
          {(orderDetails && orderDetails.status !=="completed" && orderDetails.status !== "delivered" && orderDetails.canceled !== "true" &&  orderDetails.dealTime)? <Countdown date={(Date.now() + 24 * 60 * 60 * 1000 * parseInt(orderDetails.dealTime)-(Date.now()-date.getTime())) } />: null}
          </h4>
        </div>
        <div className='d-flex flex-row justify-content-center w-full'>
          
          <ReviewModal openBuyerReview={openBuyerReview} setOpenBuyerReview ={setOpenBuyerReview} orderDetails={orderDetails} />
          {(orderDetails.assignedBy === user._id)? <AcceptDeliveryConfirmation setOpenBuyerReview={setOpenBuyerReview} orderDetails={orderDetails} /> :<DeliverWork orderDetails={orderDetails}/>}
        
        </div>
        <div className='d-flex flex-row justify-content-center w-full'>
         {orderDetails.assignedBy === user._id?<BuyerExtendDelivery orderDetails={orderDetails} />: <SellerExtendDelivery orderDetails={orderDetails} /> }
        </div>
      </div>
      {orderDetails.cancelled !== 'true' && orderDetails.completed !== 'true'? 
      <div className='delivery-container bg-white shadow-md rounded p-3 mt-4'>
      <p className='font-semibold text-lg'>Request Cancel</p>
        <div className='flex flex-row justify-center items-center'>
        <CancelModal orderDetails={orderDetails}/>
        </div>
        
      </div>: null
}
   <OrderDetails orderDetails={orderDetails} date={date} date2={date2} />
      <div className=' bg-white p-3 mt-4'>
        <p className='font-semibold text-lg'>Track Your Order</p>
        <div className='ml-3'>
          <TrackOrder orderDetails={orderDetails} deliveries={deliveries} />
        </div>
      </div>
      <div className='notes-container bg-white p-3 mt-4'>
        <div className='flex flex-row justify-between'>
            <div>
                <p className='font-semibold text-lg'>Private Note</p>
                <p className='font-normal text-gray-400'>Only Visible to You</p>
            </div>
            <div>
            {note  && !openEdit && <button className='text-green-600 font-semibold' onClick={handleEditOpen}>Edit Note</button>}
           <DeleteNote note={note} setNote={setNote} openEdit={openEdit} setOpenEdit={setOpenEdit} />
            {/* {openEdit &&  <button className='text-green-600 font-semibold' onClick={handleDeleteNote}>Delete</button>} */}
              {!note && !openEdit &&  <button className='text-green-600 font-semibold' onClick={handleOpenSave}>Add Note</button>}  
            </div>
           
        </div>
          <div>
          <div className='p-1'>
            <Textarea
                  value={note && note.msg}
                  id="note"
                  placeholder="Leave a note..."
                  required={true}
                  rows={4}
                  onChange={handleNoteChange}
                />
          </div>
         
      {!openEdit && openSave &&   <div className='flex flex-row justify-end'>
            <Button color="gray" className="m-1" onClick={()=> setOpenNotepad(false)}>
              Cancel
            </Button>
            <SaveNote orderDetails={orderDetails} note={note} user ={user} setOpenSave={setOpenSave} setOpenNotepad={setOpenNotepad} />
            </div>
}

          </div>
{openEdit && !openSave && 
                      <div className='flex flex-row justify-end'>
                        <Button color="gray" className="m-1" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <EditNote note={note} setOpenEdit={setOpenEdit} />
                      </div>
            }
      </div>

      <div className='bg-white p-3 mt-4'>
        <p className='font-semibold text-lg'>Feedback on the new order page?</p>
        <p className='text-blue-700 font-normal text-base cursor-pointer hover:underline'>Let us know what you think</p>
      </div>
      <div className='bg-white p-3 mt-4'>
        <p className='text-semibold text-lg font-bold'>Support</p>
        <div className='cursor-pointer'>
        <p className='font-semibold text-base hover:underline'>FAQS</p>
        <p>Find Answers Needed</p>
        </div>
        <Divider sx={{bgcolor: "gray"}} />
        <div className='cursor-pointer'>
        <p className='font-semibold text-base hover:underline'>Resolution Center</p>
        <p>Resolve Order Issues</p>
        </div>
      </div>
    </div>
  )
}

export default SellerOrderDetailsRight

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}