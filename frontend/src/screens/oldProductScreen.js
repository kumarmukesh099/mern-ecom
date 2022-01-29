import React, { useEffect, useState } from "react";
import {useSelector} from 'react-redux';
import Ratings from "../components/Ratings";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import {
  listProductDetails,
  productCreateReview,
} from "../actions/productActions.js";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
//import { createBrowserHistory as history} from 'history';

const ProductScreen = ({ productDetails, listProductDetails }) => {
  const { product, loading, error } = productDetails;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(0);

  const productCreateReview = useSelector(state => state.productCreateReview);
  const {loading:loadingProduct,error:errorProductReview,success : successProductReview}= productCreateReview;
  
  const { userInfo } = useSelector(state => state.userLogin);

  const navigate = useNavigate();

  let params = useParams();
  useEffect(() => {
    listProductDetails(params.id);
  }, [listProductDetails, params.id]);
  const Container = styled.div``;                                                                                                                                      
  const Wrapper = styled.div`
    padding: 5px;
    display: flex;
  `;

  const ImgContainer = styled.div``;

  const Img = styled.img`
    width: 100%;
    height: 90%;
    object-fit: cover;
  `;

  const InfoContainer = styled.div`
    padding: 0px 50px;
  `;

  const Title = styled.h3`
    font-weight: 200;
    width: 250px;
  `;

  const Desc = styled.p`
    margin: 20px 0px;
    width: 250px;
  `;

  const Price = styled.h4`
    font-weight: 100;
  `;
  const CartPrice = styled.p`
    margin: 5px 0px;
    text-align: center;
  `;

  const Status = styled.p`
    text-align: center;
  `;

  const [quantity, setQuantity] = useState(1);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <Container>
      <Button style={{ border: "2px solid blue", margin: "2px" }} href="/">
        Back
      </Button>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message />
      ) : (
        <Wrapper>
          <ImgContainer>
            <Img src={product.image} />
          </ImgContainer>
          <InfoContainer>
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
          </InfoContainer>
          <Paper
            elevation={3}
            style={{ height: "100%", width: "20%", margin: "12px" }}
          >
            <CartPrice>Price: $ {product.price}</CartPrice>
            <Divider />
            <Status>
              Status: {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
            </Status>
            <Divider />
            {product.countInStock > 0 && (
              <div style={{ textAlign: "center" }}>
                Quantity :
                <FormControl>
                  <Select value={quantity} onChange={handleChange}>
                    {[...Array(product.countInStock).keys()].map((value) => {
                      return (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <Divider />
              </div>
            )}
            {product.countInStock > 0 && (
              <Button
                style={{
                  border: "2px solid blue",
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
        </Wrapper>
      )}
    </Container>
  );
};

ProductScreen.Ratings = {
  display: "flex",
};

const mapStateToProps = (state) => ({
  productDetails: state.productDetails,
});

export default connect(mapStateToProps, { listProductDetails })(ProductScreen);
