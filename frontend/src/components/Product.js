import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Ratings from './Ratings';


const Product = ({product}) => {
    return (
        <Card>
          <CardActionArea href={`/product/${product._id}`}>
            <CardMedia
              component="img"
              image= {product.image}
              alt="Please refresh"
            />
            <CardContent >
              <Typography gutterBottom variant="h5" textAlign="center" component="div">
                {product.name}
              </Typography>
              <Typography variant="div" textAlign="center" color="text.secondary">
                <Ratings 
                value={product.rating}
                text={`${product.numReviews} reviews`}
                />
              </Typography>
              <Typography variant="h5" textAlign="center" color="text.secondary">
                $ {product.price}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Button size="large" style={{margin:"auto",display:"flex"}} href="/cart">Add To Cart</Button>
        </Card>
    )
}

export default Product
