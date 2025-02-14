import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api"; 

const fetchCertificaciones = (data) => {
  return data.certificacion.map((certificacion) => ({
    id: certificacion.id,
    nombre: certificacion.nombre,
    institucion: certificacion.institucion,
    fecha: certificacion.fecha,
    archivoPath: certificacion.archivo_path
  }));
};

const Certification = ({ id }) => {
  const [certificaciones, setCertificaciones] = useState([]);

  useEffect(() => {
    api.get(`/api/profesor/cv/${id}`)
      .then((response) => {
        setCertificaciones(fetchCertificaciones(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {certificaciones.length > 0 ? (
          certificaciones.map((cert) => (
            <Grid item xs={12} key={cert.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{cert.nombre}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">{cert.institucion} - {new Date(cert.fecha).toLocaleDateString()}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Archivo: <a href={`/path_to_files/${cert.archivoPath}`} target="_blank" rel="noopener noreferrer">Ver certificado</a>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No hay certificaciones disponibles.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Certification;
