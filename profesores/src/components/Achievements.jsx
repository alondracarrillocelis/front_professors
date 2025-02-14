import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api";

const fetchAchievements = (data) => {
  return data.logros.map((logro) => ({
    id: logro.id,
    nombre: logro.nombre,
    institucion: logro.institucion,
    fecha: logro.fecha,
    tipo: logro.tipo
  }));
};

const Achievements = ({ id }) => {
  const [logros, setLogros] = useState([]);

  useEffect(() => {
    api.get(`/api/profesor/cv/${id}`)
      .then((response) => {
        setLogros(fetchAchievements(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener los datos de logros:", error);
      });
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {logros.length > 0 ? (
          logros.map((logro) => (
            <Grid item xs={12} key={logro.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{logro.nombre}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Institución: {logro.institucion}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha: {new Date(logro.fecha).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Tipo: {logro.tipo}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No hay logros disponibles.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Achievements;
