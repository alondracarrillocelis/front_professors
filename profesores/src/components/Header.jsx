import React from "react";
import { AppBar, Toolbar, IconButton, Box, Paper } from "@mui/material";
import { Home, Description } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "20px",
        margin: "10px",
        overflow: "hidden",
      }}
    >
      <AppBar
        position="static"
        sx={{
          bgcolor: "#A6D785", // Verde pistache
          borderRadius: "20px",
          padding: "5px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo / Título */}
          <Box
            component="span"
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#2E7D32",
              letterSpacing: "1px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            CV
          </Box>

          {/* Botones con Iconos */}
          <Box>
            <IconButton
              component={Link}
              to="/"
              sx={{
                color: "#2E7D32",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.2)", color: "#1B5E20" },
              }}
            >
              <Home fontSize="large" />
            </IconButton>

            <IconButton
              component={Link}
              to="/showCV"
              sx={{
                color: "#2E7D32",
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.2)", color: "#1B5E20" },
              }}
            >
              <Description fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Paper>
  );
};

export default Header;
