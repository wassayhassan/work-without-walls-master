import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {BsCloudDownload} from "react-icons/bs";
import {AiTwotoneFileAdd} from 'react-icons/ai';

export default function DeliveryAccordions({deliveries}) {
    let ext;
  return (
    <div>
        {deliveries && deliveries.map((delivery, idx)=> {
            
            return (
                <Accordion sx={{margin: 2}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Delivery {idx}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='flex flex-row flex-wrap p-1'>
                    {delivery.DeliveryMaterials.map((material, ix)=> {
                    return (<div className='h-16 w-16 bg-gray-200 rounded-md m-1' key={ix}>
                        {/* <div className='flexf flex-row justify-center w-full'>
                            <p className='font-medium text-base'>.{ext = getFileExtension(material)}</p>  
                        </div> */}
                        <AiTwotoneFileAdd size="3em" />
                        <a href={`http://localhost:7900/uploads/${material}`} download>
                            <BsCloudDownload size="1.2em"  className='ml-3'/>
                        </a>
                        </div>)
                   })}
                    </div>

                </AccordionDetails>
              </Accordion>
            )
        })}
     
    </div>
  );
}
const getFileExtension = (filename) => {
    return filename.split('.').pop();
}