import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userList, deleteUser } from "../actions/userActions";
import Loader from "../components/Loader";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  IconButton
} from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red, green, blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { listOrders } from "../actions/orderActions";

const OrderList = () => {
  const { orders, loading } = useSelector((state) => state.orderList);
  const navigation = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigation("/");
    }
  }, [dispatch, successDelete]);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : (
        <TableContainer style={{ border: "2px solid black" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>USER</strong>
                </TableCell>
                <TableCell>
                  <strong>DATE</strong>
                </TableCell>
                <TableCell>
                  <strong>TOTAL</strong>
                </TableCell>
                <TableCell>
                  <strong>PAID</strong>
                </TableCell>
                <TableCell>
                  <strong>Delivered</strong>
                </TableCell>
                <TableCell>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders &&
                orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.user && order.user.name}</TableCell>
                    <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                    <TableCell>${order.totalPrice}</TableCell>
                    <TableCell>
                      {order.isPaid ? (
                        <CheckIcon/>
                      ) : (
                        <CancelIcon sx={{ color: red[500] }} />
                      )}
                    </TableCell>
                    <TableCell>
                      {order.isDelivered ? (
                        <CheckIcon/>
                      ) : (
                        <CancelIcon sx={{ color: red[500] }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton href={`/order/${order._id}`}>View</IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default OrderList;
