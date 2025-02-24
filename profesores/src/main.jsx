import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataScreen from "./screens/dataScreen";
import Header from "./components/Header";
import ShowCV from "./screens/showCv";
import AllCV from "./components/allCV";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header /> {/* El Header se mostrará en todas las pantallas */}
      <Routes>
        <Route path="/" element={<DataScreen />} />  {/* Página principal */}
        <Route path="/showCV" element={<AllCV />} />
        <Route path="/cv/:id" element={<ShowCV />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
