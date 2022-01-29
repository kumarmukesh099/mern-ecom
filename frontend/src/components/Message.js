import React from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

const MyAlert = ({ msg, type }) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (msg, variant) => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(msg, { variant });
  };
  return <div>{handleClickVariant(msg, type)}</div>;
};

const Message = ({ msg, severity }) => {
  console.log("Message", msg, "severity",severity)
  return (
    <SnackbarProvider   
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      maxSnack={3}
    >
      <MyAlert msg={msg} type={severity} />
    </SnackbarProvider>
  );
};

//This was happening to me because I was using useSnackbar() 
//inside my main app.js (or router) component, which, incidentally,
// is the same one where the component is initialized.
// You cannot consume a context provider in the same component that declares it,
// it has to be a child element. So, I created an empty component called Snackbar which handles saving the enqueueSnackbar 
//and closeSnackbar to the global class (SnackbarUtils.js in the example answer).
//https://stackoverflow.com/questions/63752243/what-is-causing-this-enqueue-snackbar-error-for-notistack

Message.defaultProps = {
  msg: "Try again later",
  severity: "error",
};

export default Message;
