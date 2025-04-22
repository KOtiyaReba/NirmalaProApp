import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Paper,
  Typography,
  Switch,
  FormControlLabel
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Admin = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const location = useLocation();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    isAvailable: true,
    images: [],
  });

  const [categories, setCategories] = useState([]);

  // Fetch categories and set data if editing
  useEffect(() => {
    axios
      .get(`${baseURL}/cat`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Category fetch error:", err));

    if (location.state !== null) {
      const { pro } = location.state;
      setProductData({
        name: pro.name || "",
        price: pro.price || "",
        category: pro.category?._id || pro.category || "",
        description: pro.description || "",
        stock: pro.stock || "",
        isAvailable: pro.isAvailable ?? true,
        images: [], // images not prefilled
      });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleToggle = (e) => {
    setProductData({ ...productData, isAvailable: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("category", productData.category);
    formData.append("description", productData.description);
    formData.append("stock", productData.stock);
    formData.append("isAvailable", productData.isAvailable);

    productData.images.forEach((file) => {
      formData.append("images", file);
    });

    if (location.state !== null) {
      const id = location.state.pro._id;
      axios
        .put(`${baseURL}/product/${id}`, formData)
        .then((res) => {
          alert(res.data.message);
          navigate("/pro");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`${baseURL}/product`, formData)
        .then((res) => {
          alert("Product added successfully!");
          setProductData({
            name: "",
            price: "",
            category: "",
            description: "",
            stock: "",
            isAvailable: true,
            images: [],
          });
          navigate('/pro')
        })
        .catch((err) => {
          console.error(err);
          alert("Error adding product");
        });
    }
  };

  return (
    <div>
      <br />
      <Button variant="contained">
        <Link to="/d" style={{ textDecoration: "none", color: "white" }}>
          Product Details
        </Link>
      </Button>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f2f2f2",
          p: 2,
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
          <Typography variant="h6" mb={2}>
            {location.state ? "Update Product" : "Add New Product"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Name & Price */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Product Name *"
                  name="name"
                  value={productData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Price *"
                  name="price"
                  type="number"
                  value={productData.price}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12}>
                <FormControl fullWidth size="small" required>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    label="Category"
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat._id} value={cat._id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Stock & Description */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Stock Quantity"
                  name="stock"
                  type="number"
                  value={productData.stock}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Description"
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                />
              </Grid>

              {/* Availability Toggle */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={productData.isAvailable}
                      onChange={handleToggle}
                    />
                  }
                  label="Available"
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12}>
                <Button variant="outlined" component="label" size="small">
                  Upload Images
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      setProductData({
                        ...productData,
                        images: Array.from(e.target.files),
                      })
                    }
                  />
                </Button>
                <Typography variant="caption" display="block">
                  {productData.images.length} file(s) selected
                </Typography>
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              size="small"
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default Admin;
