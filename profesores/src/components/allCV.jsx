import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const AllCV = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/api/profesor/")
      .then((response) => {
        console.log("Respuesta del backend:", response.data);
        setCvs(response.data.profesores);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los CV:", error);
        setLoading(false);
      });
  }, []);

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

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Lista de CVs
      </Typography>
      <Grid container spacing={3}>
        {cvs.map((cv) => (
          <Grid item xs={12} sm={6} md={4} key={cv.id}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  {cv.nombre} {cv.apellido_paterno} {cv.apellido_materno}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {cv.resumen_profesional}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => navigate(`/cv/${cv.id}`)}
                >
                  Ver CV
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AllCV;
