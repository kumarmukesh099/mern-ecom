import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { useNavigate, useParams } from "react-router-dom";

import { Grid, TextField, FormControl, Button } from "@mui/material";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstant.js";
import {
  listProductDetails,
  updateProduct,
} from "../actions/productActions.js";
import { FormControlLabel, FormLabel } from "@material-ui/core";
import axios from 'axios';

const ProductEditScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("false");
  const [description, setDescription] = useState("false");
  const [price, setPrice] = useState(99);
  const [image, setImage] = useState("false");
  const [brand, setBrand] = useState("false");
  const [category, setCategory] = useState("false");
  const [countInStock, setCountInStock] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const productId = params.id;
  const [uploading, setUploading] = useState(false);

  const { loading: loadingProduct, product } = useSelector(
    (state) => state.productDetails
  );

  const { success: productUpdateSuccess } = useSelector(
    (state) => state.productUpdate
  );

  const handleEditProduct = (e) => {
    e.preventDefault();
    let data = {
      name,
      description,
      price,
      image,
      brand,
      category,
      countInStock,
      numReviews
    };
    dispatch(updateProduct(data, productId));
    dispatch({
      type: PRODUCT_UPDATE_RESET,
    });
    //dispatch(updateProduct(data,productId))
    return window.alert("Product Edited Successfully");
  };

  const uploadFileHandler = async (e) => {
      console.log("file data",
      e.target.files)
    const file = e.target.files[0];
    const formData = new FormData();
    //append the file
    console.log("daataa")
    //formData.append("image", file);
    formData.set("image", file);
    setUploading(true);
    try {
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  useEffect(() => {
    if (productUpdateSuccess) {
      navigate("/admin/products");
    }
    if (!product._id || product._id != productId) {
      dispatch(listProductDetails(productId));
    } else {
      //console.log("name image",name,descri)
      if (product.name) setName(product.name);
      if (product.description) setDescription(product.description);
      if (product.price) setPrice(product.price);
      if (product.image) setImage(product.image);
      if (product.brand) setBrand(product.brand);
      if (product.category) setCategory(product.category);
      if (product.countInStock) setCountInStock(product.countInStock);
      if (product.numReviews) setNumReviews(product.numReviews);
    }
  }, [navigate, product, productUpdateSuccess]);

  return loadingProduct ? (
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
          onSubmit={handleEditProduct}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Description"
            name="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <FormLabel>Image</FormLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            name="image"
            type="file"
            onChange={uploadFileHandler}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Brand"
            name="brand"
            value={brand}
            onChange={(event) => setBrand(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Available Quantity"
            name="countInStock"
            type="number"
            value={countInStock}
            onChange={(event) => setCountInStock(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Reviews"
            name="numReviews"
            value={numReviews}
            type="number"
            onChange={(event) => setNumReviews(event.target.value)}
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

export default ProductEditScreen;
