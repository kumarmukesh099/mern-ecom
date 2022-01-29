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
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_FAILED,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_FAILED,
  PRODUCT_TOP_RATED_SUCCESS,
  PRODUCT_TOP_RATED_REQUEST,
  PRODUCT_TOP_RATED_FAILED
} from "../constants/productConstant.js";

// eslint-disable-next-line
//export default (state = { products: [] }, action) => {
export const productListReducer = (state = { products: [],pages:{} }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        success:false,
        loading: true,
        products: []
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        success : true,
        products: action.payload.products,
        pages : action.payload.pages
      };
    case PRODUCT_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  console.log("delete reducer calling");
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_DELETE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productCreateReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case PRODUCT_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true
      };
    case PRODUCT_UPDATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, action) => {
  console.log("tyepee",action.type)
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PRODUCT_CREATE_REVIEW_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};



export const productTopRatedReducer = (state = {products:[]}, action) => {
  console.log("tyepee",action.type)
  switch (action.type) {
    case PRODUCT_TOP_RATED_REQUEST:
      return {
        loading: true,
        products:[]
      };
    case PRODUCT_TOP_RATED_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_TOP_RATED_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
