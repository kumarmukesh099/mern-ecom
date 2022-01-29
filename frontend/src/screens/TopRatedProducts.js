import * as React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { Paper, Button } from "@mui/material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function TopRatedProduct() {
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return loading ? (
    <Loader />
  ) : (
    <AutoPlaySwipeableViews
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
    >
      {products &&
        products.map((step, index) => {
          return (
            <div key={step._id} style={{ textAlign: "center" }}>
              <Paper
                elevation={24}
                component="img"
                sx={{
                  height: "350px",
                  display: "block",
                  overflow: "hidden",
                  margin: "auto",
                  width: "60%",
                }}
                src={step.image}
              />
              <Button href={`/product/${step._id}`}>{step.name}</Button>
            </div>
          );
        })}
    </AutoPlaySwipeableViews>
  );
}

export default TopRatedProduct;
