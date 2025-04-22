import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";

const ProDetails = () => {
  const [products, setProducts] = useState([]);
  var location = useLocation();
  var navigate = useNavigate();
  console.log("loc", location.state);

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);
  const updateProd = (pro) => {
    console.log(pro);
    navigate("/admin", { state: { pro } });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        p: 4,
      }}
    >
      <Box sx={{ width: "90%", maxWidth: "1000px" }}>
        <Typography variant="h6" gutterBottom>
          Product List
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Price</strong>
                </TableCell>
                <TableCell>
                  <strong>Stock</strong>
                </TableCell>
                <TableCell>
                  <strong>Category</strong>
                </TableCell>
                <TableCell>
                  <strong>Availability</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category?.name || "N/A"}</TableCell>
                  <TableCell>{product.isAvailable ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        updateProd(product);
                      }}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ProDetails;
