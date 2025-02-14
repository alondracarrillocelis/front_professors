import { Container, Card, CardContent, Typography, Grid } from "@mui/material";

const PersonalInfo = () => {
  const user = {
    nombre: "Adrian",
    apellidoPaterno: "Rocha",
    apellidoMaterno: "Chacon",
    fechaNacimiento: "1995-07-10",
    calle: "Av. Principal",
    codigoPostal: "12345",
    colonia: "Centro",
    numeroInt: "4B",
    numeroExt: "102",
    celular: "123-456-7890",
    correo: "adrian@example.com",
    tipoSangre: "O+",
    resumenProfesional: "Desarrollador de software con experiencia en aplicaciones móviles y backend con Node.js."
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Card sx={{ p: 3, boxShadow: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {user.nombre} {user.apellidoPaterno} {user.apellidoMaterno}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user.resumenProfesional}
            </Typography>
          </Grid>
        </Grid>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><Typography><b>Fecha de Nacimiento:</b> {user.fechaNacimiento}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography><b>Tipo de Sangre:</b> {user.tipoSangre}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography><b>Celular:</b> {user.celular}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography><b>Correo:</b> {user.correo}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography><b>Calle:</b> {user.calle}, {user.numeroExt} {user.numeroInt && `Int. ${user.numeroInt}`}</Typography></Grid>
            <Grid item xs={12} sm={6}><Typography><b>Colonia:</b> {user.colonia}, CP {user.codigoPostal}</Typography></Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PersonalInfo;
