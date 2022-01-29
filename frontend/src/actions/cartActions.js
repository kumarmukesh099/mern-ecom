import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM,CART_SAVE_SHIPPING_ITEM,CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstant.js";

//Add Item to Cart
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  console.log("id, cart",id,quantity)
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity: quantity,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    ); //We need to stringify it because we only save string in local storage
  } catch (error) {
    console.log("error", error);
  }
};

//Remove Item from Cart
export const removeFromCart = (id) =>(dispatch,getState)=>{
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};


//Save shipping address
export const saveShippingAddress = (data) =>(dispatch,getState)=>{
  dispatch({
    type: CART_SAVE_SHIPPING_ITEM,
    payload: data,
  });
  localStorage.setItem("shippingAddress",JSON.stringify(data));

};

//Save payment method
export const savePaymentMethod = ({paymentMethod}) =>(dispatch,getState)=>{
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentMethod,
  });
  localStorage.setItem("paymentMethod",JSON.stringify(paymentMethod));
};  