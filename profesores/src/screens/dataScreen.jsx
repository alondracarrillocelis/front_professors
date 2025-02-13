import { useEffect, useState } from "react";
import api from "../api";
import { Container, CircularProgress } from "@mui/material";
import StepperForm from "../components/StepperForm"; // Importa el StepperForm

const DataScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/profesor") // Cambia el endpoint según tu backend
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <StepperForm /> // Renderiza el StepperForm aquí
      )}
    </Container>
  );
};

export default DataScreen;