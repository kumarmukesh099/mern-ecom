import {
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAILED,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAILED,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAILED,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAILED,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_FAILED,
  PRODUCT_TOP_RATED_SUCCESS,
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_FAILED
} from "../constants/productConstant.js";
import axios from "axios";

//list products
export const listProducts = (searchValue='',pageNumber=1) => async (dispatch) => {
  try {
    console.log("checl value",pageNumber)
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get(`/api/products?keyword=${searchValue}&pageNumber=${pageNumber}`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//fetch a product details
export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: PRODUCT_DETAILS_FAILED,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//delete a product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
  });

  const {
    userLogin: { userInfo },
  } = getState();

  let request = {
    url : `/api/products/${id}`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfo.token}`,
    },
    method: "DELETE", 
  };
  const { data } = await axios(request);
  dispatch({
    type: PRODUCT_DELETE_SUCCESS,
    payload: data,
  });
} catch (error) {
  console.log(error.response.data);
  dispatch({
    type: PRODUCT_DELETE_FAILED,
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


//create a product
export const createProduct = (productData) => async (dispatch, getState) => {
  try {
  dispatch({
    type: PRODUCT_CREATE_REQUEST,
  });

  const {
    userLogin: { userInfo },
  } = getState();

  let request = {
    data : productData,
    url : `/api/products`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfo.token}`,
    },
    method: "POST", 
  };
  await axios(request);
  dispatch({
    type: PRODUCT_CREATE_SUCCESS
  });
} catch (error) {
  console.log(error.response.data);
  dispatch({
    type: PRODUCT_CREATE_FAILED,
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


//update a product
export const updateProduct = (productData,id) => async (dispatch, getState) => {
  try {
  dispatch({
    type: PRODUCT_UPDATE_REQUEST,
  });

  const {
    userLogin: { userInfo },
  } = getState();

  let request = {
    data : productData,
    url : `/api/products/${id}`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfo.token}`,
    },
    method: "PUT", 
  };
  await axios(request);
  dispatch({
    type: PRODUCT_UPDATE_SUCCESS
  });
} catch (error) {
  console.log(error.response.data);
  dispatch({
    type: PRODUCT_UPDATE_FAILED,
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


//create product review
export const createReview = (review,productId) => async (dispatch, getState) => {
  try {
  dispatch({
    type: PRODUCT_CREATE_REVIEW_REQUEST,
  });

  const {
    userLogin: { userInfo },
  } = getState();

  let request = {
    data : review,
    url : `/api/products/${productId}/reviews`,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${userInfo.token}`,
    },
    method: "POST", 
  };
    await axios(request);
  dispatch({
    type: PRODUCT_CREATE_REVIEW_SUCCESS
  });
} catch (error) {
  console.log(error.response.data);
  dispatch({
    type: PRODUCT_CREATE_REVIEW_FAILED,
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


//fetch top rated product
export const fetchTopRatedProduct = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_RATED_REQUEST });
    const { data } = await axios.get('/api/products/top');
    dispatch({
      type: PRODUCT_TOP_RATED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_RATED_FAILED,
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};