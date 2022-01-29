import React, { useState } from "react";
import {useSelector,useDispatch} from 'react-redux';
import { Grid, FormControl, TextField, Button } from "@mui/material";
import { saveShippingAddress } from "../actions/cartActions.js";
import {useNavigate} from 'react-router-dom';
import CheckoutSteps from "../components/CheckoutSteps.js";

const ShippingScreen = () => {  
    const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const submitAddress = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = Object.fromEntries(data);
    setAddress(data.address);
    setZipCode(data.zipCode);
    setCity(data.city);
    setState(data.state);
    setCountry(data.country);
    dispatch(saveShippingAddress(data));
    navigate('/payment');
  };

  return (
    <Grid>
      <Grid item>
      <CheckoutSteps step={[1,2]} />
      </Grid>
      <Grid item>
        <h2
          style={{
            borderBottom: "4px double blue",
            width: "fit-content",
            margin: "auto",
          }}
        >
          Shipping Address
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
          onSubmit={submitAddress}
        >
          <TextField margin="normal" label="Address" name="address" />
          <TextField margin="normal" label="City" name="city" />
          <TextField margin="normal" label="State" name="state" />
          <TextField margin="normal" label="Zip Code" name="zip_code" />
          <TextField margin="normal" label="Country" name="country" />
          <Button type="submit" variant="contained" margin="normal">
            Continue
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ShippingScreen;
