// import React, { useState } from "react";
// import { FormControl, Button, TextField } from "@mui/material";

// const SearchBox = () => {
//   const [keyword, setKeyword] = useState("");
//   return <form style={{margin:"auto"}}>
//       <input style={{border:"3px solid red",height:"40px"}}type="text" placeholder="Search..."/>
//       <button style={{margin:"1px",height:"30px"}}>Search</button>
//   </form>;
// };

// export default SearchBox;

import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { listProducts } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";

export default function SearchBox() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, success } = productList;
  const [searchValue, setSearchValue] = useState("");
  {
    products && console.log("product", products);
  }

  useEffect(() => {
    if (searchValue) {
      dispatch(listProducts(searchValue.trim()));
    } else {
      dispatch(listProducts());
    }
  }, [searchValue]);

  return (
    <Autocomplete
      id="combo-box-demo"
      my="dsada"
      options={products}
      renderOption={(props, option) => {     //for rendering the list
        return (
          <li {...props} key={option._id}>
            {option.name}
          </li>
        );
      }}
      onChange={(event, newValue) =>
        newValue && newValue.name
          ? setSearchValue(newValue.name)
          : setSearchValue("")
      }
      getOptionLabel={(option) => {        
        //redering the label when selecting the value
        return option.name;
      }}
      sx={{ width: 300, margin: "auto" }}
      renderInput={(params) => {
        return <TextField variant="outlined" {...params} label="Search..." />;
      }}
    />
  );
}
