import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Divider } from "@mui/material";
import Product from "../components/Product.js";
import { listProducts } from "../actions/productActions.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import PaginationComponent from "../components/Pagination.js";
import TopRatedProduct from "./TopRatedProducts.js";
import Meta from '../components/Meta.js';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  //const [products, setProducts] = useState([]);
  const { loading, error, products, pages } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <Container>
      <Meta />
      <div style={{ margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Top Rated Products</h1>
      <TopRatedProduct />
      </div>
      <Divider/>
      <h1 style={{ textAlign: "center" }}>Latest Products</h1>
      {loading ? (
        <h2>{<Loader />}</h2>
      ) : error ? (
        <h3>
          <Message error={error} />
        </h3>
      ) : (
        <div style={grid}>
          {products &&
            products.map((product) => (
              <Product product={product} key={product._id} />
            ))}
        </div>
      )}
      {pages && pages.count && (
        <Grid>
          <Grid item md={4} style={{ margin: "auto" }}>
            <PaginationComponent count={pages.count} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", //Column takes up one fraction unit of the remaining space
  gridGap: "2rem",
  margin: "2px",
};

export default HomeScreen;
