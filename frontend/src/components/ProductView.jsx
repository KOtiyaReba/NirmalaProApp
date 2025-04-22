import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import axios from "axios";

const ProductView = () => {
  const [products, setProducts] = useState([]);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Fetch products from your backend
    axios.get(`${baseURL}/product`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <Grid container spacing={3} padding={2}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={6} key={product._id}>
          <Card sx={{ height: "100%" }}>
            <CardMedia
              component="img"
              height="200"
              image={`http://localhost:3000/uploads/${product.images[0]}`} // Adjust to your backend path
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="subtitle1" color="text.secondary">
                ₹{product.price}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="body2">
                Stock: {product.stock}
              </Typography>
              <Typography
                variant="body2"
                color={product.isAvailable ? "green" : "red"}
              >
                {product.isAvailable ? "Available" : "Not Available"}
              </Typography>
            </CardContent>
            
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductView;
