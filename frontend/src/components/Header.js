import React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
//import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
//import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from "@mui/icons-material/Person";
import SvgIcon from "@mui/material/SvgIcon";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions.js";
import SearchBox from "./SearchBox.js";


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElement, setAnchorElement] = React.useState(null);
  const open = Boolean(anchorEl);
  const openAdmin = Boolean(anchorElement);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickAdmin = (event) => {
    console.log(event.currentTarget)
    setAnchorElement(event.currentTarget);
  };

  const profileHandler = () => {
    navigate("/profile");
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    dispatch(logout());
    setAnchorEl(null);
    navigate("/");
  };
  const productHandler = () => {
    //dispatch(logout());
    setAnchorElement(null);
    navigate("/admin/products");
  };
  const usersHandler = () => {
    //dispatch(logout());
    setAnchorElement(null);
    navigate("/admin/users");
  };
  const ordersHandler = () => {
    //dispatch(logout());
    setAnchorElement(null);
    navigate("/admin/orders");
  };

  const { userInfo } = useSelector((state) => state.userLogin);
  console.log("Dada", userInfo);
  
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            href="/"
          >
            Mern Ecom
          </Typography>
          <div style={{margin:"auto"}}>
          <SearchBox />
          </div>
          <IconButton
            color="inherit"
            size="small"
            href="/cart"
            aria-label="add to shopping cart"
          >
            <ShoppingCartIcon />
            Cart
          </IconButton>
          {userInfo ? (
            <div>
              <Button style={{ color: "white" }} onClick={handleClick}>
                <PersonIcon fontSize="medium" />
                {userInfo.name}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={profileHandler}>Profile</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color="inherit" href="/login">
              {" "}
              {/*window.open("https://reactjs.org/") */}
              {/* <i className="fas fa-user">  Sign in</i> */}
              <PersonIcon fontSize="medium" />
              Sign In
            </Button>
          )}
          {userInfo && userInfo.isAdmin && <div>
              <Button style={{ color: "white" }} onClick={handleClickAdmin}>
                Admin
              </Button>
              <Menu anchorEl={anchorElement} open={openAdmin} onClose={()=> setAnchorElement(null)}>
                <MenuItem onClick={productHandler}>Products</MenuItem>
                <MenuItem onClick={usersHandler}>Users</MenuItem>
                <MenuItem onClick={ordersHandler}>Orders</MenuItem>
              </Menu>
            </div>
          }
          <IconButton color="inherit" size="small" href="/">
            <HomeIcon fontSize="medium" />
            Home
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
