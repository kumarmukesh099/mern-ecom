import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { useNavigate, useParams } from "react-router-dom";

import {
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Button,
} from "@mui/material";
import { updateUser, getUserDetails } from "../actions/userActions";
import { Checkbox } from "@material-ui/core";
import { USER_UPDATE_RESET } from "../constants/userConstant.js";

const UserEditScreen = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdmin, setisAdmin] = useState(false);
  const { loading, success } = useSelector((state) => state.userUpdate);
  const {user,success:successUser} = useSelector((state)=> state.userDetails)
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');

  const handleUpdateUser = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = Object.fromEntries(data);
    console.log("data",data)
    dispatch(updateUser({name,email}, userId));
  };
  useEffect(() => {
    if (success) {
        dispatch({
        type: USER_UPDATE_RESET,
      });
      navigate('/');
    }
    if(!userId || userId != user._id){
      dispatch(getUserDetails(userId));
    }else{
      setName(user.name);
      setEmail(user.email);
      console.log("Coming herer time",successUser,user.name,user.email)
      console.log("Coming herer time=====>",name,email)
    }
  }, [navigate,success,userId,user]);

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
      <Button
        style={{
          padding: "5px",
          border: "1px solid blue",
          marginLeft: 0,
          display: "block",
          margin: "12px",
          width: "fit-content",
        }}
        href="/admin/users"
        variant="contained"
      >
        Go Back
      </Button>
      <h2
        style={{
          margin: "auto",
          borderBottom: "5px blue double",
          width: "fit-content",
        }}
      >
        Edit User
      </h2>
      <Grid item>
        <FormControl component="form" onSubmit={handleUpdateUser}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(event)=> setName(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            label="Email Address"
            name="email"
            value={email}
            onChange={(event)=> setEmail(event.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox name="isAdmin" value="true" color="primary" />
            }
            label="Remember me"
          />
          <Button
            style={{ padding: "5px", border: "1px solid blue", margin: "5px" }}
            variant="contained"
            type="submit"
          >
            Update
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default UserEditScreen;
