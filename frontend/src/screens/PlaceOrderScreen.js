import React,{useEffect} from "react";
import {
  Grid,
  GridList,
  List,
  ListItem,
  CardMedia,
  Link,
  Divider,
  Chip,
  Button,
  Paper,
} from "@material-ui/core";
import CheckoutSteps from "../components/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../actions/orderActions";
import {useNavigate} from 'react-router-dom';

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const {order,success,error} = useSelector((state=>state.orderCreate))
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const navigate = useNavigate();

  //calculate prices
  cart.itemPrices = Number(
    cartItems.reduce((acc, item) => {
      return acc + item.price;
    }, 0)
  ).toFixed(2);

  //calculate quantity
  cart.itemQuantity = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  //calculate shipping
  cart.shippingPrice = (Number(cart.itemPrices > 100 ? 100 : 0)).toFixed(2);

  //calculate tax
  cart.taxPrice = (Number(0.15 * cart.itemPrices)).toFixed(2);
  
  //calculate totalPrice
  cart.totalPrice =
    Number(cart.itemPrices) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);

  useEffect(()=>{
    if(success){
      navigate(`/order/${order._id}`);
    }
  },[navigate,success])

  const placeOrderHandler = () => {
    console.log("Place Order");
    dispatch(createOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        shippingPrice: cart.shippingPrice,
        itemPrices : cart.itemPrices,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <Grid
      container
      style={{
        textAlign: "center",
        border: "2px solid black",
        display: "block",
      }}
    >
      <CheckoutSteps step={[1, 2, 3, 4]} />
      <Grid style={{ border: "3px blue double", display: "flex" }}>
        <Grid item md={8} style={{ border: "1px blue double" }}>
          <Grid item>
            <h3
              style={{
                border: "2px solid blue",
                width: "fit-content",
                margin: "auto",
                padding: "7px",
              }}
            >
              Order Items
            </h3>
            {cartItems.length == 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <Grid
                  container
                  key={item.name}
                  style={{ display: "flex", padding: "10px" }}
                >
                  <Grid item md={4}>
                    <CardMedia component="img" image={item.image} />
                  </Grid>
                  <Grid item md={4}>
                    <h3>
                      <Link href={`/product/${item.product}`}>{item.name}</Link>
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
          </Grid>
          <Grid item>
            <Divider />
            <h3
              style={{
                border: "2px solid blue",
                width: "fit-content",
                margin: "auto",
                padding: "7px",
              }}
            >
              Shipping Address
            </h3>
            <div>
              <h4>
                {shippingAddress.address},<br />
                {shippingAddress.city},<br />
                {shippingAddress.state},{shippingAddress.zip_code},
                <br />
                {shippingAddress.country}
              </h4>
            </div>
            <Divider />
          </Grid>
          <Grid item>
            <h3
              style={{
                border: "2px solid blue",
                width: "fit-content",
                margin: "auto",
                padding: "7px",
              }}
            >
              Payment Method
            </h3>
            <h4>{paymentMethod}</h4>
          </Grid>
        </Grid>
        <Grid
          item
          md={4}
          style={{ border: "3px blue double", height: "fit-content" }}
        >
          <h3
            style={{
              border: "2px solid blue",
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
              Items :
            </Grid>
            <Grid style={{ padding: "10px" }} item md={6}>
              {cart.itemQuantity}
            </Grid>
            <Grid style={{ padding: "10px" }} item md={6}>
              Shipping :
            </Grid>
            <Grid style={{ padding: "10px" }} item md={6}>
              {cart.shippingPrice}
            </Grid>
            <Grid style={{ padding: "10px" }} item md={6}>
              Tax :
            </Grid>
            <Grid style={{ padding: "10px" }} item md={6}>
              {cart.taxPrice}
            </Grid>
            <Grid style={{ padding: "10px" }} item md={6}>
              Total :
            </Grid>
            <Grid style={{ padding: "10px" }} item md={6}>
              {cart.totalPrice}
            </Grid>
          </Grid>
          <Divider />
          <Button
            variant="contained"
            color="primary"
            onClick={placeOrderHandler}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PlaceOrderScreen;
