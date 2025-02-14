import { useEffect, useState } from "react";
import api from "../api";
import { Container, CircularProgress } from "@mui/material";
import StepperForm from "../components/StepperForm"; // Importa el StepperForm
import Login from "../components/Login"; // Importa el componente Login

const DataScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar el login

  useEffect(() => {
    api.get("/api/profesor") 
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="full" >
      {loading ? (
        <CircularProgress />
      ) : (
        isLoggedIn ? (
          <StepperForm /> 
        ) : (
          <Login onLogin={() => setIsLoggedIn(true)} /> // Muestra el login si no está logueado
        )
      )}
    </Container>
  );
};

export default DataScreen;