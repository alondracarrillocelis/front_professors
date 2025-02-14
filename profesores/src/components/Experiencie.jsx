import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api"; 

const fetchExperience = (data) => {
  return data.experiencia.map((exp) => ({
    id: exp.id,
    empresa: exp.empresa,
    cargo: exp.cargo,
    fechaInicio: exp.fecha_inicio,
    fechaFinalizacion: exp.fecha_finalizacion,
    referencia: exp.referencia,
    anotaciones: exp.anotaciones,
    actual: exp.actual,
    funciones: exp.funciones
  }));
};

const Experience = ({ id }) => {
  const [experiencia, setExperiencia] = useState([]);

  useEffect(() => {
    api.get(`/api/profesor/cv/${id}`)
      .then((response) => {
        setExperiencia(fetchExperience(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener los datos de experiencia:", error);
      });
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {experiencia.length > 0 ? (
          experiencia.map((exp) => (
            <Grid item xs={12} key={exp.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{exp.cargo} - {exp.empresa}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {new Date(exp.fechaInicio).toLocaleDateString()} - {exp.actual ? "Actualmente trabajando" : new Date(exp.fechaFinalizacion).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {exp.anotaciones}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Referencia: {exp.referencia}
                  </Typography>
                  {exp.funciones && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Funciones: {exp.funciones}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No hay información de experiencia disponible.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Experience;
