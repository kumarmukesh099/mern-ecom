import React, { useEffect, Fragment } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";

const CartScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const productId = params.id;
  const quantity = location.search ? Number(location.search.split("=")[1]) : 1;
  const { cartItems } = cart;
  console.log("cartitems",cart)
  const checkOutHandler = () => {
    console.log("Proceed to checkout");
    navigate("/login?redirect=shipping");
  };

  useEffect(() => {
    if (productId && quantity) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);
  return (
    <Grid container>
      <Grid item md={8} style={{ border: "3px blue solid" }}>
        <h1 style={{ textAlign: "center", border: "3px double" }}>
          {" "}
          Shopping Cart
        </h1>
        {cartItems.length === 0 ? (
          <h3 style={{textAlign:"center"}}>You cart is empty........ Please add some items</h3>
        ) : (
          <Fragment>
            {cartItems.map((item) => (
              <Grid key={item.product}>
                <Grid container style={{ display: "flex", padding: "5px" }}>
                  <Grid item md={4}>
                    <CardMedia component={"img"} src={item.image} />
                  </Grid>
                  <Grid item md={4} style={{ textAlign: "center" }}>
                    <Link href={`/product/${item.product}`}>{item.name}</Link>
                  </Grid>
                  <Grid item md={2}>
                    Price : ${item.price}
                  </Grid>
                  <Grid item md={1}>
                    <FormControl>
                      <Select
                        value={item.quantity}
                        onChange={(event) => {
                          dispatch(
                            addToCart(item.product, Number(event.target.value))
                          );
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((value) => {
                          return (
                            <MenuItem key={value} value={value}>
                              {value}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={1}>
                    <IconButton
                      style={{ display: "flex" }}
                      onClick={() => dispatch(removeFromCart(item.product))}
                    >
                      <DeleteRoundedIcon fontSize="medium" />
                    </IconButton>
                  </Grid>
                </Grid>
                <Divider />
              </Grid>
            ))}
          </Fragment>
        )}
      </Grid>
      <Grid
        item
        md={4}
        style={{
          border: "3px blue double",
          height: "100%",
          textAlign: "center",
          display: "block",
          width: "fit-content"
        }}
      >
        <h1 style={{ border: "3px black double" }}>Checkout</h1>
        <Grid item>
          <h3>
            SubTotal: (
            {cartItems.reduce((acc, item) => {
              return acc + item.quantity;
            }, 0)}
            ) Items
          </h3>
        </Grid>
        <Grid item>
          <p>
            Total: ${" "}
            {cartItems.reduce((acc, item) => {
              return parseFloat(acc + item.quantity * item.price).toFixed(2);
            }, 0)}
          </p>
        </Grid>
        <Grid item style={{ border: "2px blue double" }}>
          <Button
            variant="outlined"
            onClick={checkOutHandler}
            disabled={cartItems.length === 0}
          >
            Proceed To Checkout
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CartScreen;
