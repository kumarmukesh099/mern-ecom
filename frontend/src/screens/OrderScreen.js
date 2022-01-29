import React, { useEffect, useState } from "react";
import {
  Grid,
  CardMedia,
  Link,
  Divider,
  Chip,
  Button,
  Paper,
} from "@material-ui/core";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrder, deliverOrder } from "../actions/orderActions";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import axios from 'axios';
import {PayPalButton} from 'react-paypal-button-v2';
import {ORDER_PAY_RESET} from '../constants/orderConstant';
import {payOrder} from '../actions/orderActions';

const OrderScreen = () => {
  const params = useParams();
  const orderId = params.id;
  const dispatch = useDispatch();
  const [sdkReady,setSdkReady] = useState(false);
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { success:successPay, loading:loadingPay } = useSelector((state) => state.orderPay);
  const {userInfo} = useSelector((state)=> state.userLogin);
  const {success:deliverSuccess} = useSelector((state)=> state.orderDeliver);
  
  const successPaymentHandler = (paymentResult)=>{
    dispatch(payOrder(orderId,paymentResult));
  }
  const markOrderAsDelivered = ()=>{
    dispatch(deliverOrder(orderId));
  }

  useEffect(() => {
    const addPayPalScript = async()=>{
      const {data:clientId} = await axios.get('/api/config/paypal');
      //createScript
      let script = document.createElement('script');
      script.type="text/javascript";
      script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload=()=>{
        setSdkReady(true);
      }
      document.body.appendChild(script);
      console.log("coming gere",order,successPay);
      if(!order || !Object.keys(order).length || successPay || deliverSuccess){
        dispatch({
          type:ORDER_PAY_RESET
        })
        dispatch(fetchOrder(orderId));
      }else if(!order.isPaid){
        if(!window.paypal){
          addPayPalScript();
        } 
        else{
          setSdkReady(true);
        }
      }
    }
    addPayPalScript();
    
  }, [dispatch,deliverSuccess]);

  return loading ? (
    <Loader />
  ) : (
    order && (
      <div style={{}}>
        <Divider />
        <Grid container style={{ border: "3px blue double", display: "flex" }}>
          <Grid item md={8} style={{ border: "1px blue double" }}>
            <h3 style={{ textAlign: "center" }}>OrderId : ${order._id}</h3>
            <Grid item>
              <h3
                style={{
                  borderBottom: "2px solid blue",
                  width: "fit-content",
                  margin: "auto",
                  padding: "7px",
                  textAlign: "center",
                }}
              >
                Order Items
              </h3>
              {order.orderItems && order.orderItems.length == 0 ? (
                <p>Order data is available</p>
              ) : (
                order.orderItems &&
                order.orderItems.map((item) => (
                  <Grid
                    container
                    key={item.name}
                    style={{
                      display: "flex",
                      padding: "10px",
                      textAlign: "center",
                    }}
                  >
                    <Grid item md={4}>
                      <CardMedia component="img" image={item.image} />
                    </Grid>
                    <Grid item md={4}>
                      <h3>
                        <Link href={`/product/${item.product}`}>
                          {item.name}
                        </Link>
                      </h3>
                    </Grid>
                    <Grid item md={4}>
                      <h3>
                        {item.quantity} x {item.price} = $
                        {item.quantity * item.price}
                      </h3>
                    </Grid>
                  </Grid>
                ))
              )}
              <Divider/>
            </Grid>

            <Grid container item style={{ padding: "7px" }}>
              <Grid item md={8}>
                <h3
                  style={{
                    borderBottom: "2px solid blue",
                    width: "fit-content",
                  }}
                >
                  Shipping Address
                </h3>
                {order.shippingAddress && (
                  <div>
                    {order.user && (
                      <p>
                        <strong>Name:</strong>
                        {order.user.name}
                      </p>
                    )}
                    {order.user && (
                      <p>
                        <strong>Email:</strong>
                        {order.user.email}
                      </p>
                    )}
                    <p>
                      <strong>Address:</strong>
                      {order.shippingAddress.address},
                      {order.shippingAddress.city},{order.shippingAddress.state}
                      ,{order.shippingAddress.zip_code},
                      {order.shippingAddress.country}
                    </p>
                    {order && order.isDelivered ? <p><strong>Delivery Status :</strong>Delivered on {order.deliveredAt}</p>:(
                    <p><strong>Delivery Status:</strong> Not Delivered</p>
                )}
                  </div>
                )}
                <Divider />
              </Grid>
              <Grid item md={4}>
                <h3
                  style={{
                    borderBottom: "2px solid blue",
                    width: "fit-content",
                  }}
                >
                  Payment Mode
                </h3>
                <p><strong>Selected Method :</strong> {order.paymentMethod}</p>
                {order && order.isPaid ? <p><strong>Payment :</strong>Paid On  {order.paidAt}</p>:(
                    <p><strong>Payment :</strong> Not Paid</p>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            md={4}
            style={{ border: "3px blue double", height: "fit-content",textAlign:"center" }}
          >
            <h3
              style={{
                borderBottom: "2px solid blue",
                width: "fit-content",
                margin: "auto",
                padding: "7px",
              }}
            >
              Order Summary
            </h3>
            <Divider />
            <Grid container>
              <Grid style={{ padding: "10px" }} item md={6}>
              <strong>ItemsPrice :</strong>
              </Grid>
              <Grid style={{ padding: "10px" }} item md={6}>
                ${Number(order.itemPrices).toFixed(2)}
              </Grid>
              <Grid style={{ padding: "10px" }} item md={6}>
              <strong>Shipping :</strong>
              </Grid>
              <Grid style={{ padding: "10px" }} item md={6}>
                ${Number(order.shippingPrice).toFixed(2)}
              </Grid>
              <Grid style={{ padding: "10px" }} item md={6}>
              <strong>Tax :</strong>
              <Divider/>
              </Grid>
              <Grid style={{ padding: "10px" }} item md={6}>
                ${Number(order.taxPrice).toFixed(2)}
                <Divider/>
              </Grid>
              <Grid style={{ padding: "10px" }} item md={6}>
              <strong>Total :</strong>
              </Grid>
              <Grid style={{ padding: "10px" }} item md={6}>
                ${Number(order.totalPrice).toFixed(2)}
              </Grid>
            </Grid>
            <Divider />
            <Grid style={{ padding: "10px" }}>
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered ?
                <Button variant="contained" style={{color:"blue"}} onClick={markOrderAsDelivered}>Mark As Delivered</Button> : !sdkReady ? <Loader/>:(
                  !order.isDelivered && <PayPalButton  amount={order.totalPrice} 
                  onSuccess={successPaymentHandler} />
                )
              }
               {loadingPay && <Loader/>}
              </Grid>
          </Grid>
        </Grid>
      </div>
    )
  );
};

export default OrderScreen;
