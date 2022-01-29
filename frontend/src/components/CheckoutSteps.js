import React from "react";
import { buildSanitizeFunction } from "express-validator";
import { Box, Link, Button, Stepper, Step, StepLabel } from "@mui/material";

const CheckoutSteps = ({ step }) => {
  const steps = [
    "Login",
    "Shipping",
    "Payment",
    "Place Order"
  ];
  
  
  let activeStep = step && step.length ? step[step.length-2] : 0;
  return (
    <Box style={{padding:"15px",width:"70%",margin:"auto"}}>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => {
          return <Step key={step}>
            <StepLabel>{step}</StepLabel>
          </Step>
        })}
      </Stepper>
    </Box>
  );
};

export default CheckoutSteps;
