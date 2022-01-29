import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Ratings from "../components/Ratings";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Grid, Rating } from "@mui/material";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { listProductDetails } from "../actions/productActions.js";
import { createReview } from "../actions/productActions";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { styled } from "@mui/system";

import {
  CardMedia,
  FormControlLabel,
  List,
  ListItem,
  Link,
  ListItemText,
  ListItemAvatar,
  TextField,
  FormGroup,
} from "@material-ui/core";
//import { createBrowserHistory as history} from 'history';

const ProductScreen = ({ productDetails, listProductDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let params = useParams();

  const { product, loading, error } = productDetails;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingProduct,
    error: errorProductReview,
    success: successProductReview,
  } = productCreateReview;

  const { userInfo } = useSelector((state) => state.userLogin);

  let productId = params.id;

  useEffect(() => {
    listProductDetails(params.id);
  }, [listProductDetails, params.id, successProductReview]);

  const Title = styled("h2")({
    fontWeight: "200",
  });

  const Desc = styled("p")({
    margin: "20px 0px",
  });

  const Price = styled("h4")({});
  const CartPrice = styled("p")({});

  const Status = styled("p")({});

  const [quantity, setQuantity] = useState(1);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const commentHandler = () => {
    let review = {
      rating: rating,
      comment: comment,
    };
    dispatch(createReview(review, productId));
    setRating(0);
    setComment("");
  };

  return (
    <Grid>
      <Button style={{ border: "2px solid blue", margin: "2px" }} href="/">
        Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <Grid>
          <Grid item container md={12}>
            <Grid item md={5}>
              <CardMedia component="img" src={product.image} />
            </Grid>
            <Grid
              item
              md={4}
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              <Title>{product.name}</Title>
              <Divider />
              <Ratings
                style={{ display: "flex" }}
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
              <Divider />
              <Price>Price: $ {product.price}</Price>
              <Divider />
              <Desc>{product.description}</Desc>
            </Grid>
            <Grid
              item
              md={3}
              style={{
                margin: "0px auto",
                padding: "10px",
              }}
            >
              <Paper
                elevation={24}
                style={{ padding: "10px", textAlign: "center" }}
              >
                <CartPrice>Price: $ {product.price}</CartPrice>
                <Divider />
                <Status>
                  Status:{" "}
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </Status>
                <Divider />
                {product.countInStock > 0 && (
                  <div style={{ textAlign: "center" }}>
                    <p>Quantity :</p>
                    <FormControl>
                      <Select value={quantity} onChange={handleChange}>
                        {[...Array(product.countInStock).keys()].map(
                          (value) => {
                            return (
                              <MenuItem key={value} value={value}>
                                {value}
                              </MenuItem>
                            );
                          }
                        )}
                      </Select>
                    </FormControl>
                    <Divider />
                  </div>
                )}
                {product.countInStock > 0 && (
                  <Button
                    variant="contained"
                    style={{
                      display: "block",
                      margin: "auto",
                    }}
                    onClick={() => {
                      navigate(`/cart/${params.id}?quantity=${quantity}`);
                    }}
                  >
                    Add To Cart
                  </Button>
                )}
              </Paper>
            </Grid>
            <Grid
              item
              md={6}
              style={{ padding: "20px", margin: "auto", textAlign: "center" }}
            >
              <h2>Reviews</h2>
              {product && product.reviews.length == 0 ? (
                <p>No reviews</p>
              ) : (
                product.reviews &&
                product.reviews.map((review) => {
                  return (
                    <div key={review._id}>
                      <Ratings
                        style={{ padding: "8px" }}
                        value={review.rating}
                      />
                      <p>
                        {" "}
                        <strong>By : </strong>
                        {review.name}
                      </p>
                      <p>
                        <strong>Dated : </strong>
                        {review.createdAt && review.createdAt.substring(0, 10)}
                      </p>
                      <p>
                        <strong>Comment :</strong> {review.comment}
                      </p>
                      <Divider />
                    </div>
                  );
                })
              )}
            </Grid>
            <Grid item md={6} style={{ padding: "20px", margin: "auto" }}>
              <div>
                <h2>Write a customer Review</h2>
                {userInfo ? (
                  <FormGroup component="form" onSubmit={commentHandler}>
                    <Rating
                      value={parseInt(rating)}
                      precision={0.5}
                      onChange={(event, newValue) =>
                        setRating(parseInt(newValue))
                      }
                    />
                    <TextField
                      label="Comment"
                      margin="normal"
                      fullWidth
                      onChange={function (event) {
                        return setComment(event.target.value);
                      }}
                    />
                    <Button
                      variant="contained"
                      style={{ width: "fit-content" }}
                      onClick={commentHandler}
                    >
                      Comment
                    </Button>
                  </FormGroup>
                ) : (
                  <p>
                    Please <Link href="/login">sign in</Link> to write a review{" "}
                  </p>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

ProductScreen.Ratings = {
  display: "flex",
};

const mapStateToProps = (state) => ({
  productDetails: state.productDetails,
});

// const mapStateToProps = (state) => {
//   return {
//     productDetails: state.productDetails,
//   };
// };

export default connect(mapStateToProps, { listProductDetails })(ProductScreen);
