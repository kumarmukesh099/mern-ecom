import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { useNavigate, useParams } from "react-router-dom";

import { Grid, TextField, FormControl, Button } from "@mui/material";
import { PRODUCT_CREATE_RESET } from "../constants/productConstant.js";
import { createProduct } from "../actions/productActions.js";

const ProductAddScreen = () => {
  const params = useParams();
  const userId = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdmin, setisAdmin] = useState(false);
  const {
    loading: productCreateLoading,
    success: productCreateSuccess,
  } = useSelector((state) => state.productCreate);

  const handleAddProduct = (e) => {
    e.preventDefault();
    let data = new FormData(e.currentTarget);
    data = Object.fromEntries(data);
    //console.log("data",data)
    dispatch(createProduct(data));
    return window.alert("Product Added Successfully");
  };
  useEffect(() => {
    if (productCreateSuccess) {
      dispatch({
        type: PRODUCT_CREATE_RESET,
      });
      navigate("/admin/products");
    }
  }, [navigate, productCreateSuccess]);

  return productCreateLoading ? (
    <Loader />
  ) : (
    <Grid
      container
      style={{
        border: "3px solid black",
        textAlign: "center",
        margin: "auto",
        display: "block",
        alignItems: "center",
      }}
    >
      <Button
        style={{
          padding: "5px",
          border: "1px solid blue",
          marginLeft: 0,
          display: "block",
          margin: "12px",
          width: "fit-content",
        }}
        href="/admin/products"
        variant="contained"
      >
        Go Back
      </Button>
      <h2
        style={{
          margin: "auto",
          borderBottom: "5px blue double",
          width: "fit-content",
        }}
      >
        Add Product
      </h2>
      <Grid item md={6} style={{ margin: "auto" }}>
        <FormControl
          style={{ width: "100%" }}
          component="form"
          onSubmit={handleAddProduct}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            name="description"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Price"
            name="price"
            type="number"
          />
           <TextField
            margin="normal"
            required
            fullWidth
            label="Image"
            name="image"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Brand"
            name="brand"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Category"
            name="category"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Available Quantity"
            name="countInStock"
            type="number"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Reviews"
            name="numReviews"
            type="number"
          />
          <Button
            style={{ padding: "5px", border: "1px solid blue", margin: "5px" }}
            variant="contained"
            type="submit"
          >
            Save
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ProductAddScreen;
