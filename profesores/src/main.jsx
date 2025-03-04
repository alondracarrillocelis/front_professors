import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import DataScreen from "./screens/dataScreen";
import Header from "./components/Header";
import ShowCV from "./screens/showCv";
import AllCV from "./components/allCV";
import Login from "./screens/login";
import { Box } from "@mui/system";

// Componente para rutas privadas
const PrivateRoute = () => {
  // const token = localStorage.getItem("token");
  // return token ? <Outlet /> : <Navigate to="/login" replace />;
  return <Outlet />; // Comentamos la validación para permitir acceso sin login
};

// Componente Layout que oculta el Header en /login
const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeader = location.pathname === "/login";

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {!hideHeader && <Header />}
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 3 }}>{children}</Box>
    </Box>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              // <Navigate to={localStorage.getItem("token") ? "/dashboard" : "/login"} replace />
              <Navigate to="/dashboard" replace /> // Comentamos la validación para ir directo al dashboard
            } 
          />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DataScreen />} />
            <Route path="/showCV" element={<AllCV />} />
            <Route path="/cv/:id" element={<ShowCV />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
);
