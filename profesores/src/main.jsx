import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DataScreen from "./screens/dataScreen";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<DataScreen />} />  {/* Página principal */}
      </Routes>
    </Router>
  </React.StrictMode>
);
