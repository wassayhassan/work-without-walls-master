import React, {useState} from 'react'
import { Modal, Button } from 'flowbite-react'
import {HiOutlineExclamationCircle} from 'react-icons/hi';
import { updateOrder } from '../../api';
import { makeReqCancelActivity } from '../../api';

const CancelModal = ({orderDetails}) => {

  const [openCancel, setOpenCancel] = useState(false);

  const handleRequestCancel = async() => {
     const res = await updateOrder(orderDetails._id, {status: 'Requested Cancel'});
     if(res.status === 200){
        const dat = await makeReqCancelActivity({orderId: orderDetails._id, activityType: 'cancelrequest', msg: 'Buyer has requested to cancel the order'});
        setOpenCancel(false)
     }
  }



  return (
    <React.Fragment>
    <Button onClick={()=> setOpenCancel(true)}>
      Request Cancel
    </Button>
    <Modal
      show={openCancel}
      size="md"
      popup={true}
      onClose={()=> setOpenCancel(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to cancel this Order?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={handleRequestCancel}
            >
              Yes, I'm sure
            </Button>
            <Button
              color="gray"
              onClick={()=> setOpenCancel(false)}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  </React.Fragment>
  )
}

export default CancelModal