import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  FormControl,
  TextField,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { savePaymentMethod } from "../actions/cartActions.js";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps.js";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [payment, setPayment] = useState("PayPal");
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const submitPaymentMethod = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = Object.fromEntries(data);
    dispatch(savePaymentMethod(data));
    navigate("/placeOrder");
  };

  return (
    <Grid>
      <Grid item>
        <CheckoutSteps step={[1, 2, 3]} />
      </Grid>
      <Grid item>
        <h2
          style={{
            borderBottom: "4px double blue",
            width: "fit-content",
            margin: "auto",
          }}
        >
          Payment Methods
        </h2>
      </Grid>
      <Grid
        item
        style={{
          border: "1px solid black",
          width: "70%",
          textAlign: "center",
          margin: "auto",
        }}
      >
        <FormControl
          component="form"
          style={{ width: "50%" }}
          onSubmit={submitPaymentMethod}
        >
          <FormLabel
            style={{
              textAlign: "left",
              fontSize: "23px",
              borderBottom: "4px solid blue",
              width: "fit-content",
            }}
          >
            Select Payment Methods
          </FormLabel>
          <RadioGroup defaultValue={payment} name="paymentMethod">
            <FormControlLabel
              value="PayPal"
              control={<Radio />}
              label="PayPal or Credit Card"
            />
            <FormControlLabel
              value="Stripe"
              control={<Radio />}
              label="Stripe"
            />
          </RadioGroup>
          <Button variant="outlined" type="submit">Continue</Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default PaymentScreen;
