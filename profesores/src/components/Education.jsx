import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api";

const fetchEducation = (data) => {
  return data.educacion.map((edu) => ({
    id: edu.id,
    institucion: edu.institucion,
    carrera: edu.carrera,
    fechaIngreso: edu.fecha_ingreso,
    fechaEgreso: edu.fecha_egreso,
    anotaciones: edu.anotaciones,
    cedulaPath: edu.cedula_path
  }));
};

const Education = ({ id }) => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    api.get(`/api/profesor/cv/${id}`)
      .then((response) => {
        setEducation(fetchEducation(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener los datos de educación:", error);
      });
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {education.length > 0 ? (
          education.map((edu) => (
            <Grid item xs={12} key={edu.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{edu.carrera}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {edu.institucion} - {new Date(edu.fechaIngreso).getFullYear()} - {new Date(edu.fechaEgreso).getFullYear()}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {edu.anotaciones}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Cédula profesional: <a href={edu.cedulaPath} target="_blank" rel="noopener noreferrer">Ver documento</a>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No hay información de educación disponible.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Education;
