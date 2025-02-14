import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi Aplicación
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={Link} to="/showCV">
          Ver CV
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
