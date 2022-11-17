import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AiTwotoneFileAdd} from 'react-icons/ai';
import {BsCloudDownload} from 'react-icons/bs';

const OrderMessage = ({message, orderDetails, user}) => {
    const date = new Date(message.createdAt);

    let ext;
  return (
    <Accordion sx={{marginY: 2}}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
        <div className='flex flex-row'>
              <p className='font-semibold text-lg text-gray-600'>{message.title}</p>
              <p className='m-2 '>{date.toUTCString()}</p>
        </div>

      
      
    </AccordionSummary>
    <AccordionDetails>
       <div>
        <div>
            <p>{message.message}</p>
        </div>
        <div className='flex flex-row flex-wrap p-1'>
                    {message.attachments.map((attachment, ix)=> {
                    return (<div className='h-16 w-w20 bg-gray-200 rounded-md m-1 flex flex-col' key={ix}>
                        <div className='h-3/4'>
                          <AiTwotoneFileAdd size="3em" />
                        </div>
                        
                        <div className='flex flex-row h-1/4'>
                            <div>
                                <p className='font-medium text-base'>.{ext = getFileExtension(attachment)}</p>
                            </div>
                            <div>                       
                                 <a href={`http://localhost:7900/uploads/${attachment}`} download>
                                   <BsCloudDownload size="1.1em"  className='ml-3'/>
                                 </a>
  
                            </div>
                        </div>

                        </div>)
                   })}
                    </div>

        </div>
    </AccordionDetails>
  </Accordion>
  )
}

export default OrderMessage

const getFileExtension = (filename) => {
    return filename.split('.').pop();
}