import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../api"; 

const fetchLanguages = (data) => {
  return data.idiomas.map((idioma) => ({
    id: idioma.id,
    idioma: idioma.idioma,
    nivel: idioma.nivel,
    certificado: idioma.certificado
  }));
};

const Languages = ({ id }) => {
  const [idiomas, setIdiomas] = useState([]);

  useEffect(() => {
    api.get(`/api/profesor/cv/${id}`)
      .then((response) => {
        setIdiomas(fetchLanguages(response.data));
      })
      .catch((error) => {
        console.error("Error al obtener los datos de idiomas:", error);
      });
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {idiomas.length > 0 ? (
          idiomas.map((idioma) => (
            <Grid item xs={12} key={idioma.id}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>{idioma.idioma}</Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Nivel: {idioma.nivel}
                  </Typography>
                  {idioma.certificado && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Certificado: {idioma.certificado}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">No hay información de idiomas disponible.</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Languages;
