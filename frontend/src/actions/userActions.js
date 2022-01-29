import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_RESET,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAILED,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILED,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAILED,
  USER_UPDATE_RESET
} from "../constants/userConstant";
import {ORDER_LIST_MY_RESET} from '../constants/orderConstant'
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    let request = {  
      data: {
        email,
        password,
      },
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    };
    const { data } = await axios("/api/users/login", request);

    // const { data } = await axios.post(
    //   "/api/users/login",
    //   { email, password },
    //   { headers: { "Content-Type": "application/json" } }
    // );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: USER_LOGIN_FAILED,
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

export const logout = () => (dispatch) => {
  //remove item from localstorage
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGIN_LOGOUT,
  });
  dispatch({
    type: USER_DETAILS_RESET,
  });
  dispatch({
    type: ORDER_LIST_MY_RESET,
  });
  dispatch({
    type: USER_LIST_RESET,
  });
  dispatch({
    type: USER_UPDATE_RESET,
  });
  
};

export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    let request = {
      data: {
        name,
        email,
        password,
      },
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    };
    const { data } = await axios("/api/users/register", request);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: USER_REGISTER_FAILED,
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

export const getUserDetails = (id) => async (dispatch, getState) => {
  console.log("Coming here")
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let request = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
      method: "GET",
    };
    const { data } = await axios(`/api/users/${id}`, request);
    console.log("Before")
    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: USER_DETAILS_FAILED,
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

export const userUpdateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let request = {
      data: user,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
      method: "PUT",
    };
    const { data } = await axios(`/api/users/profile`, request);
    dispatch({
      type: USER_DETAILS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: USER_DETAILS_UPDATE_FAILED,
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


export const userList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });     
    const {
      userLogin: { userInfo },
    } = getState();

    let request = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
      method: "GET",
    };
    const { data } = await axios(`/api/users`, request);
    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: USER_LIST_FAILED,
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


export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let request = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
      method: "DELETE",
    };
    const { data } = await axios(`/api/users/${id}`,request);
    dispatch({
      type: USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: USER_DELETE_FAILED,
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


export const updateUser = (userData,id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    let request = {
      data:userData,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.token}`,
      },
      method: "PUT",
    };
    const { data } = await axios(`/api/users/${id}`,request);
    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: USER_UPDATE_FAILED,
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
