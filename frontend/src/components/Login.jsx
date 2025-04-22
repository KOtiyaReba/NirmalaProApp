import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState({});


  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addHandler = () => {
    if (!user.email || !user.password) {
      setError("Both fields are required.");
      return;
    }

    axios
      .post(`${baseURL}/api/login`, user)
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) {
          alert(res.data.message);
          if(res.data.user.role == 'admin'){
            navigate('/admin')
          }else{
            navigate('/pro')
          }
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4" color="purple" align="center" gutterBottom>
          Welcome to Product App
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" mb={2}>
          Please login to continue
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Email"
          name="email"
          onChange={inputHandler}
        />
        <TextField
          fullWidth
          margin="normal"
          variant="outlined"
          label="Password"
          type="password"
          name="password"
          onChange={inputHandler}
        />



        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={addHandler}
          sx={{ marginTop: "1.5rem", padding: "0.75rem" }}
        >
          Login
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: "1rem", color: "text.secondary" }}
        >
          New here?{" "}
          <Link href="/signup" underline="hover" color="primary">
            Create an account
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
