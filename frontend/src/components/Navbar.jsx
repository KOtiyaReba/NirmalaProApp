import { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'purple' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Product App
          </Link>
        </Typography>

        <Button color="inherit">
          <Link to="/pro" style={{ textDecoration: "none", color: "white" }}>
            Products
          </Link>
        </Button>

        <>
          {/* <Button color="inherit">
            <Link to="/addP" style={{ textDecoration: "none", color: "white" }}>
              Add Products
            </Link>
          </Button> */}
          <Button color="inherit">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Logout
            </Link>
          </Button>
        </>

        <>
          <Typography
            variant="body1"
            sx={{ color: "white", marginRight: "10px" }}
          ></Typography>
        </>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
