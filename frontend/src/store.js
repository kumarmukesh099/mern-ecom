import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./reducers/index.js";

const cartItemfromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfofromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')  ? JSON.parse(localStorage.getItem('paymentMethod')): null;

const initialState = {
  userLogin: {
    userInfo: userInfofromStorage
  },
  cart: {
    cartItems: cartItemfromStorage,
    shippingAddress : shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage
  }
};
const middleware = [thunk];
const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
