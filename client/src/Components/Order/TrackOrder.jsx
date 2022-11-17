import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const steps = [
  {
    label: 'Order Started',

  },
  {
    label: 'Delivered',
  },
  {
    label: 'Accepted',
  },
];

export default function TrackOrder({orderDetails, deliveries}) {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(()=> {
      if(orderDetails.status === "started"){
        setActiveStep(0);
      } 
      if(orderDetails.status === "started" && deliveries.length > 0){
         setActiveStep(1);
      }
      if(orderDetails.status === 'completed'){
        setActiveStep(2);
      }
  }, [orderDetails, deliveries])

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
