import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api";

const fetchAptitudes = (data) => {
  if (!data || !data.aptitudes) return [];
  return data.aptitudes.map((aptitud) => ({
    id: aptitud.id,
    aptitud: aptitud.aptitud,
    descripcion: aptitud.descripcion,
  }));
};

const WorkExperience = ( id ) => {
  const [aptitudes, setAptitudes] = useState({});
  const idProfesor = id.id;


  useEffect(() => {
    api
      .get(`/api/profesor/cv/${idProfesor}`)
      .then((response) => {
        console.log("Respuesta completa:", response.data);
        setAptitudes(fetchAptitudes(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [idProfesor]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {aptitudes.length > 0 ? (
          aptitudes.map((exp) => (
            <Grid item xs={12} key={exp.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {exp.aptitud}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {exp.descripcion}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No hay aptitudes disponibles.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default WorkExperience;
