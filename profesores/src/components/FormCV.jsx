import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import api from "../api";

const PersonalInfo = (id) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const idProfesor = id.id;

  useEffect(() => {
    if (!idProfesor) return;

    setLoading(true);
    api
      .get(`/api/profesor/cv/${idProfesor}`)
      .then((response) => {
        console.log(response.data)
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
        setLoading(false);
      });
  }, [idProfesor]);

  if (loading) {
    return (
      <Container
        maxWidth="md"
        sx={{ mt: 5, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="md" sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          No se encontraron datos del profesor.
        </Typography>
      </Container>
    );
  }

  return (
    (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                {data.profesor.nombre} {data.profesor.apellido_paterno} {data.profesor.apellido_materno}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {data.profesor.resumen_profesional}
              </Typography>
            </Grid>
          </Grid>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <b>Fecha de Nacimiento:</b> {data.profesor.fecha_nacimiento}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <b>Tipo de Sangre:</b> {data.profesor.tipo_sangre}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <b>Celular:</b> {data.profesor.celular}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <b>Correo:</b> {data.profesor.correo}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <b>Calle:</b> {data.profesor.calle}, {data.profesor.numeroExt}{" "}
                  {data.profesor.numeroInt && `Int. ${data.profesor.numeroInt}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>
                  <b>Colonia:</b> {data.profesor.colonia}, CP {data.profesor.codigo_postal}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    )
  );
};

export default PersonalInfo;
