import React, { useState,useEffect } from "react";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { listProducts } from "../actions/productActions";
import { useDispatch } from "react-redux";

const PaginationComponent = ({count=10}) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(Number(value));
  };

  useEffect(() => {
   dispatch(listProducts("", page));
  }, [page])

  return (
    <Stack>
      <Pagination
        sx={{
          boxShadow: 1,
          borderRadius: 1,
          p: 2, //padding
          minWidth: 300,
          mx: "auto",
        }}
        count={count}
        page={page}
        color="primary"
        onChange={handlePageChange}
      />
    </Stack>
  );
};

export default PaginationComponent;
