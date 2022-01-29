import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import {
  FormControl,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { getUserDetails, userUpdateProfile } from "../actions/userActions.js";
import { listMyOrders } from "../actions/orderActions.js";
import Loading from "../components/Loader.js";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;
  const [message, setMsg] = useState("");
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = Object.fromEntries(data);
    if (data.password !== data.confirm_password) {
      setMsg("Password and confirm password should be same");
    } else {
      dispatch(
        userUpdateProfile({
          _id: userInfo._id,
          name: (name && name) || userInfo.name,
          email: (email && email) || userInfo.email,
          password: data.password,
        })
      );
      window.location.reload();
    }
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile")).then(() => {
          dispatch(listMyOrders());
        });
      } else {
        setName(user.name);
        setEmail(user.email);
        dispatch(listMyOrders());
      }
    }
  }, [dispatch, navigate, userInfo, user]);
  return (
    <Grid style={{ display: "flex" }}>
      <Grid item md={4}>
        <h2
          style={{
            borderBottom: "5px blue double",
            margin: "auto",
            width: "fit-content",
          }}
        >
          User Profile
        </h2>
        {message && <Message error={message} />}
        {loading && <Loader />}
        <Grid
          item
          style={{
            border: "3px blue double",
            textAlign: "center",
          }}
        >
          <Grid item>
            <FormControl component="form" onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required  
                fullWidth
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                UPDATE
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={8}>
        <h2
          style={{
            borderBottom: "5px blue double",
            margin: "auto",
            width: "fit-content",
          }}
        >
          Orders
        </h2>
        <Grid
          item
          style={{
            border: "3px blue double",
            textAlign: "center",
          }}
        >
          {loadingOrders ? (
            <Loading />
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>DATE</TableCell>
                    <TableCell>TOTAL</TableCell>
                    <TableCell>PAID</TableCell>
                    <TableCell>DELIVERED</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders &&
                    orders.map((order) => {
                      return (
                        <TableRow key={order._id}>
                          <TableCell>{order._id}</TableCell>
                          <TableCell>{order.createdAt}</TableCell>
                          <TableCell>${order.totalPrice}</TableCell>
                          <TableCell>{order.isPaid}</TableCell>
                          <TableCell>{order.isDelivered}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProfileScreen;
