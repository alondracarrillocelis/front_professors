import { useState } from "react";
import { AppBar, Toolbar, Button, Container, Grid, Paper, Typography, Box } from "@mui/material";
import FormCV from "../components/FormCV";
import WorkExperience from "../components/WorkExperiencie";
import Experience from "../components/Experiencie";
import Certification from "../components/Certification";
import Education from "../components/Education";
import Languages from "../components/Languages";
import Achievements from "../components/Achievements";
import { useParams } from "react-router-dom";

const ShowCV = () => {
  const [view, setView] = useState("form");
  const { id } = useParams();

 
  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ bgcolor: "#2e7d32" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Visualización de CV
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Paper elevation={3} sx={{ p: 3 }}>
              {view === "form" && <FormCV id={id} />}
              {view === "aptitudes" && <WorkExperience id={id} />}
              {view === "certification" && <Certification id={id} />}
              {view === "education" && <Education id={id} />}
              {view === "experiencie" && <Experience id={id} />}
              {view === "languages" && <Languages id={id} />}
              {view === "achievements" && <Achievements id={id} />}
            </Paper>
          </Grid>

          <Grid item xs={12} md={3}>
            <Paper elevation={3} sx={{ p: 2, bgcolor: "#e8f5e9" }}>
              <Typography variant="h6" sx={{ mb: 2, color: "#2e7d32" }}>
                Categorías
              </Typography>
              {[
                { label: "Datos personales", value: "form" },
                { label: "Aptitudes", value: "aptitudes" },
                { label: "Certificación", value: "certification" },
                { label: "Educación", value: "education" },
                { label: "Experiencia", value: "experiencie" },
                { label: "Idiomas", value: "languages" },
                { label: "Logros", value: "achievements" }
              ].map((item) => (
                <Button
                  key={item.value}
                  fullWidth
                  variant={view === item.value ? "contained" : "outlined"}
                  sx={{
                    mb: 1,
                    bgcolor: view === item.value ? "#2e7d32" : "transparent",
                    color: view === item.value ? "#fff" : "#2e7d32",
                    borderColor: "#2e7d32",
                    ":hover": {
                      bgcolor: view === item.value ? "#1b5e20" : "#a5d6a7",
                    },
                  }}
                  onClick={() => setView(item.value)}
                >
                  {item.label}
                </Button>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ShowCV;
