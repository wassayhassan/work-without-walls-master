import React, {useState} from 'react'
import {Button, Modal, TextInput} from 'flowbite-react';
import BuyerExtendDeliveryButton from './buyerExtendDeliveryButton';

const BuyerExtendDelivery = ({orderDetails}) => {
    const [openExtend, setOpenExtend] = useState(false)
    const [days, setDays] = useState(0);


  return (
            <div><React.Fragment>
            <button type="button" className="btn btn-link diplay-6" onClick={()=> setOpenExtend(true)}>Extend Delivery Date</button>
            <Modal
            show={openExtend}
            onClose={()=> setOpenExtend(false)}
            >
            <Modal.Header>
                Extend Delivery days for your Order
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6 flex flex-row justify-between">
                    <div className='flex flex-row justify-center items-center'>
                    <p className='font-base text-lg mt-2'>How many Days do you want to add more?</p>
                    </div>
                  <div className='w-16 h-5 flex flex-row justify-center items-center'>
                    <TextInput type={"number"} onChange={(e)=> setDays(e.target.value)} />
                  </div>
                 
                </div>
            </Modal.Body>
            <Modal.Footer>
                 <BuyerExtendDeliveryButton orderDetails={orderDetails} days={days} setOpenExtend={setOpenExtend} />
                 <Button
                color="gray"
                onClick={()=> setOpenExtend(false)}
                >
                Cancel
                </Button>
            </Modal.Footer>
            </Modal>
        </React.Fragment>
  </div>
  )
}

export default BuyerExtendDelivery