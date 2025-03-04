import { useState } from "react";
import { Box, List, ListItem, ListItemButton, ListItemText, Divider, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu as MenuIcon, Dashboard, Visibility } from "@mui/icons-material";  

const sidebarVariants = {
  hidden: { x: -250, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(true);  

  return (
    <>
      {/* Botón para abrir/cerrar el sidebar */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: "fixed",
          top: 16,
          left: isOpen ? 260 : 16,
          backgroundColor: "#2E7D32",
          color: "white",
          "&:hover": { backgroundColor: "#1B5E20" },
        }}
      >
        <MenuIcon sx={{ fontSize: 32 }} /> 
      </IconButton>

       <motion.div
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        variants={sidebarVariants}
        style={{
          width: 250,
          height: "100vh",
          backgroundColor: "#2E7D32",
          color: "white",
          position: "fixed",
          left: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
         <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Dashboard sx={{ mr: 1, fontSize: 28 }} /> 
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Módulo CV
          </Typography>
        </Box>
        <Divider sx={{ backgroundColor: "white", mb: 2 }} />

         <List>
          <ListItem disablePadding>
            <motion.div whileHover={{ scale: 1.05 }}>
              <ListItemButton component={Link} to="/dashboard">
                <Dashboard sx={{ mr: 1, fontSize: 24 }} />
                <ListItemText primary="Dashboard" sx={{ fontWeight: "bold" }} />
              </ListItemButton>
            </motion.div>
          </ListItem>
          <Divider sx={{ backgroundColor: "white" }} />

          <ListItem disablePadding>
            <motion.div whileHover={{ scale: 1.05 }}>
              <ListItemButton component={Link} to="/showCV">
                <Visibility sx={{ mr: 1, fontSize: 24 }} />
                <ListItemText primary="Ver CVs" sx={{ fontWeight: "bold" }} />
              </ListItemButton>
            </motion.div>
          </ListItem>
        </List>
      </motion.div>
    </>
  );
};

export default Header;
