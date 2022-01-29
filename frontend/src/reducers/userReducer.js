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
} from "../constants/userConstant.js";

export const userLoginReducer = (state = {userInfo:{gane:12}}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {};
    case USER_LOGIN_SUCCESS:
      console.log("data", action.payload);
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        success : true
      };
    case USER_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_DETAILS_RESET:
      return {
        loading: false,
        user: {},
      };

    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_UPDATE_REQUEST:
      return {
        loading: true,
        updateSuccess : false
      };
    case USER_DETAILS_UPDATE_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        updateSuccess : true
      };
    case USER_DETAILS_UPDATE_FAILED:
      return {
        loading: false,
        error: action.payload,
        updateSuccess : false
      };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case USER_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LIST_RESET:
      return {
        loading: false,
        users: [],
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_UPDATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_UPDATE_FAILED:
      return {
        user: {},
      };
    default:
      return state;
  }
};
