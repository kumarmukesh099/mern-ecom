import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { FormControl, TextField, Link } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../actions/userActions.js";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import GoogleButton from "react-google-button";

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    // let dataasdas = data.get("email")
    // setEmail(dataasdas);
    // setPassword(data.get("password"));
    // console.log("hello",data.get("email"))

    dispatch(login(data.get("email"), data.get("password")));
  };
  useEffect(() => {
    let path = "/";
    if (location && location.search) {
      path = location.search.split("=")[1];
      path = `/${path}`;
    }
    if (userInfo) {
      navigate(path);
    }
  }, [navigate, userInfo, location]);

  const GoogleSignin = async() => {
    function onSignIn(googleUser) {
      console.log( "signedin");
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
      console.log("Name: " + profile.getName());
  };
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.gapi.load("auth2", function () {
        /* Ready. Make a call to gapi.auth2.init or some other API */
        window.gapi.auth2
          .init({client_id: "978702697616-kjkdhvvvet5kmkp6qs6jg870675l2cm4.apps.googleusercontent.com",
            scope: "profile email", // this isn't required
          })
          .then(function (onInit, onError) {
            console.log(onInit.isSignedIn.get(),"check if error",onError)
            var auth2 = window.gapi.auth2.getAuthInstance();
            console.log(auth2.isSignedIn.get()); //now this always returns correctly 
            auth2.isSignedIn.listen(onSignIn);
    
          });
      });
    };
    document.body.append(script);
  };

  return (
    <Grid
      container
      style={{
        //border: "2px solid blue",
        textAlign: "center",
        display: "block",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          borderBottom: "5px blue double",
          margin: "auto",
          width: "fit-content",
        }}
      >
        Sign In
      </h2>
      {error && <Message error={error} />}
      {loading && <Loader />}
      <Grid item>
        <FormControl component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </FormControl>
      </Grid> 
      <Grid item>
        {/* <GoogleButton
          style={{ margin: "auto", width: "204px", height: "43px" }}
          onClick={GoogleSignin}
        /> */}
        <div style={{ margin: "15px" }}>
          New customer ? <Link href="/register">Register</Link>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginScreen;
