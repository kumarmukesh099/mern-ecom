import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts, deleteProduct } from "../actions/productActions";
import Loader from "../components/Loader";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  IconButton,
  Button,
} from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { red, green, blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { PRODUCT_DELETE_RESET } from "../constants/productConstant";

const ProductListScreen = () => {
  const { products, loading, error } = useSelector(
    (state) => state.productList
  );
  const navigation = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productDelete = useSelector((state) => state.productDelete);
  const { loading: loadingDelete, success: successDelete } = productDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      if (successDelete) {
        dispatch({
          type: PRODUCT_DELETE_RESET,
        });
      }
    } else {
      navigation("/");
    }
  }, [dispatch, userInfo, successDelete]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex" }}>
        <h2>PRODUCTS</h2>
        <Button
          variant="contained"
          style={{
            marginLeft: "auto",
            display: "block",
            color: "blue",
            backgroundColor: "rgb(63 81 181 / 50%)",
          }}
          href="/admin/products/add"
        >
          Create Product
        </Button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <TableContainer style={{ border: "2px solid black" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>NAME</strong>
                </TableCell>
                <TableCell>
                  <strong>PRICE</strong>
                </TableCell>
                <TableCell>
                  <strong>CATEGORY</strong>
                </TableCell>
                <TableCell>
                  <strong>BRAND</strong>
                </TableCell>
                <TableCell>
                  <strong></strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>{product._id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <IconButton href={`/admin/product/${product._id}/edit`}>
                        <EditIcon style={{ color: "blue" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => deleteProductHandler(product._id)}
                      >
                        <DeleteForeverIcon sx={{ color: red[500] }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ProductListScreen;
