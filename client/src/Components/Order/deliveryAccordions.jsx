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
                  <Typography>Delivery {idx + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className='flex flex-row flex-wrap p-1'>
                    {delivery.DeliveryMaterials.map((material, ix)=> {
                    return (<div className='h-16 w-20 bg-gray-200 rounded-md m-1' key={ix}>
                        <div className='h-3/4'>
                          <AiTwotoneFileAdd size="3em" />
                        </div>
                        <div className='h-3/4 flex flex-row'>
                          <p className='font-medium text-base'>.{ext = getFileExtension(material)}</p>  
                          <a href={`http://localhost:7900/uploads/${material}`} download>
                              <BsCloudDownload size="1.2em"  className='ml-3'/>
                          </a>
                        </div>

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