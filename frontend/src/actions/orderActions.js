import axios from 'axios';
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL


  } from "../constants/orderConstant.js";


//createOrder
  export const createOrder = (orderData) => async (dispatch, getState) => {
    console.log("order data",orderData)
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      let request = {
        url : '/api/orders',
        data : orderData,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.token}`,
        },
        method: "POST", 
      };
      const { data } = await axios(request);
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.message
            : error.response.data && error.response.data.message
            ? error.response.data.message
            : error.response.data &&
              error.response.data.errors &&
              error.response.data.errors.length
            ? error.response.data.errors[0].msg
            : error.message,
      });
    }
  };
  


  //fetch order by id
  export const fetchOrder = (order_id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_DETAILS_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.get(`/api/orders/${order_id}`,{headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      }});
      console.log("daaaaaata",data)
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.message
            ? error.response.message
            : error.response.data && error.response.data.message
            ? error.response.data.message
            : error.response.data &&
              error.response.data.errors &&
              error.response.data.errors.length
            ? error.response.data.errors[0].msg
            : error.message,
      });
    }
  };
  


//payOrder
export const payOrder = (id,paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let request = {
      url : `/api/orders/${id}/pay`,
      data : paymentResult,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
      method: "PUT", 
    };
    const { data } = await axios(request);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.response.data && error.response.data.message
          ? error.response.data.message
          : error.response.data &&
            error.response.data.errors &&
            error.response.data.errors.length
          ? error.response.data.errors[0].msg
          : error.message,
    });
  }
};



//list My Orders
export const listMyOrders = () => async (dispatch, getState) => {
    try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let request = {
      url : `/api/orders/myorders`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
      method: "GET", 
    };
    const { data } = await axios(request);
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.message
          ? error.response.message
          : error.response.data && error.response.data.message
          ? error.response.data.message
          : error.response.data &&
            error.response.data.errors &&
            error.response.data.errors.length
          ? error.response.data.errors[0].msg
          : error.message,
    });
  }
};

//list Order
export const listOrders = () => async (dispatch, getState) => {
  try {
  dispatch({
    type: ORDER_LIST_REQUEST,
  });

  const {
    userLogin: { userInfo },
  } = getState();

  let request = {
    url : `/api/orders`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfo.token}`,
    },
    method: "GET", 
  };
  const { data } = await axios(request);
  dispatch({
    type: ORDER_LIST_SUCCESS,
    payload: data,
  });
} catch (error) {
  console.log(error.response.data);
  dispatch({
    type: ORDER_LIST_FAIL,
    payload:
      error.response && error.response.message
        ? error.response.message
        : error.response.data && error.response.data.message
        ? error.response.data.message
        : error.response.data &&
          error.response.data.errors &&
          error.response.data.errors.length
        ? error.response.data.errors[0].msg
        : error.message,
  });
}
};



//Deliver Order
export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
  dispatch({
    type: ORDER_DELIVER_REQUEST,
  });

  const {
    userLogin: { userInfo },
  } = getState();

  let request = {
    url : `/api/orders/${id}/deliver`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfo.token}`,
    },
    method: "PUT", 
  };
  const { data } = await axios(request);
  dispatch({
    type: ORDER_DELIVER_SUCCESS,
    payload: data,
  });
} catch (error) {
  console.log(error.response.data);
  dispatch({
    type: ORDER_DELIVER_FAIL,
    payload:
      error.response && error.response.message
        ? error.response.message
        : error.response.data && error.response.data.message
        ? error.response.data.message
        : error.response.data &&
          error.response.data.errors &&
          error.response.data.errors.length
        ? error.response.data.errors[0].msg
        : error.message,
  });
}
};