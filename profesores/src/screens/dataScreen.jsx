import { useEffect, useState } from "react";
import api from "../api";
import { Container, Typography, Paper, CircularProgress } from "@mui/material";
import FormComponent from "../components/FormComponent";

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
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Datos del Backend
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="body1">{JSON.stringify(data, null, 2)}</Typography>
        )}
      </Paper>
      <FormComponent />
    </Container>
  );
};

export default DataScreen;
