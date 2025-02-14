import { Card, CardContent, Typography, Grid, Container } from "@mui/material";

// Aquí irá la función para mapear la base de datos cuando esté lista
const fetchWorkExperiences = () => {
  return [
    {
      id: 1,
      puesto: "Desarrollador Full Stack",
      empresa: "Tech Solutions",
      periodo: "Enero 2020 - Presente",
      descripcion: "Desarrollo de aplicaciones web con React y Node.js.",
      referencia: "Juan Perez",
      funciones : "Desarrollo de aplicaciones web con React y Node.js."
    },
    {
      id: 2,
      puesto: "Ingeniero de Software",
      empresa: "Innovatech",
      periodo: "Marzo 2018 - Diciembre 2019",
      descripcion: "Creación de APIs y mantenimiento de sistemas en Python.",
      referencia: "Juan Perez",
      funciones : "Creación de APIs y mantenimiento de sistemas en Python."
    }
  ];
};

const WorkExperience = () => {
  const experiences = fetchWorkExperiences();

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {experiences.map((exp) => (
          <Grid item xs={12} key={exp.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>{exp.puesto}</Typography>
                <Typography variant="subtitle1" color="text.secondary">{exp.empresa} - {exp.periodo}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{exp.descripcion}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Referencias {exp.referencia}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{exp.funciones}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WorkExperience;
