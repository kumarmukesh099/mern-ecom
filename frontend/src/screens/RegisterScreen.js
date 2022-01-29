import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  TextField,
  FormControl,
  Button
} from "@mui/material";
import { register } from "../actions/userActions";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const [message, setMsg] = useState("");
  const { loading, userInfo } = userRegister;

  const handleRegister = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    //const entries = data.entries();
    data = Object.fromEntries(data);
    if (data.password !== data.confirm_password) {
     setMsg("Password and confirm password should be same");
    } else {
      disptach(register(data));
    }
    //userRegister(data.get({name}))
  };
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <Grid
      container
      style={{
        border: "3px solid black",
        textAlign: "center",
        margin: "auto",
        display: "block",
        alignItems: "center",
      }}
    >
        {message && <Message error={message}></Message>}
      {loading && <Loader />}
      <h2
        style={{
          margin: "auto",
          borderBottom: "5px blue double",
          width: "fit-content",
        }}
      >
        Register
      </h2>
      <Grid item>
        <FormControl component="form" onSubmit={handleRegister}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            label="Email Address"
            name="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirm_password"
            label="Confirm Password"
            type="password"
          />
          <Button variant="contained" type="submit">
            Register
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default RegisterScreen;
