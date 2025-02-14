import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataScreen from "./screens/dataScreen";
import ShowCVScreen from "./screens/showCv"; // Nuevo componente
import Header from "./components/Header"; // Importamos el Header

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Header /> {/* El Header se mostrará en todas las pantallas */}
      <Routes>
        <Route path="/" element={<DataScreen />} />  
        <Route path="/showCV" element={<ShowCVScreen />} /> {/* Nueva ruta */}
      </Routes>
    </Router>
  </React.StrictMode>
);
