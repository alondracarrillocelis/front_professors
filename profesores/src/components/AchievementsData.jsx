import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Stack,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const AchievementsForm = ({ onSubmit }) => {
  const [achievements, setAchievements] = useState([
    { nombre: '', institucion: '', fecha: '', tipo: '' },
  ]);

  const handleChange = (index, e) => {
    const updatedAchievements = [...achievements];
    updatedAchievements[index][e.target.name] = e.target.value;
    setAchievements(updatedAchievements);
  };

  const handleSubmitAll = () => {
    onSubmit(achievements);
    setAchievements([{ nombre: '', institucion: '', fecha: '', tipo: '' }]); // Reiniciar después de enviar
  };

  const addAchievement = () => {
    setAchievements([...achievements, { nombre: '', institucion: '', fecha: '', tipo: '' }]);
  };

  const removeAchievement = (index) => {
    if (index === 0) return; // Evitar eliminar el primer card

    const updatedAchievements = achievements.filter((_, i) => i !== index);
    setAchievements(updatedAchievements);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Logros y Reconocimientos
      </Typography>
      <Stack spacing={3}>
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            index={index}
            achievement={achievement}
            handleChange={handleChange}
            onRemove={() => removeAchievement(index)}
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addAchievement}
        sx={{ mt: 2 }}
      >
        Agregar otro logro
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitAll}
        sx={{ mt: 2, ml: 2 }}
      >
        Guardar todos los logros
      </Button>
    </Container>
  );
};

const AchievementCard = ({ index, achievement, handleChange, onRemove }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Logro #{index + 1}
          </Typography>
          {index !== 0 && (
            <IconButton onClick={onRemove} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
        <form>
          <Grid container spacing={2}>
            {/* Nombre del logro */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre del logro"
                name="nombre"
                value={achievement.nombre}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </Grid>

            {/* Institución */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Institución"
                name="institucion"
                value={achievement.institucion}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </Grid>

            {/* Fecha */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Fecha"
                name="fecha"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={achievement.fecha}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </Grid>

            {/* Tipo de reconocimiento */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Tipo de reconocimiento</InputLabel>
                <Select
                  label="Tipo de reconocimiento"
                  name="tipo"
                  value={achievement.tipo}
                  onChange={(e) => handleChange(index, e)}
                >
                  <MenuItem value="Investigaciones">Investigaciones</MenuItem>
                  <MenuItem value="Publicaciones">Publicaciones</MenuItem>
                  <MenuItem value="Premios">Premios</MenuItem>
                  <MenuItem value="Certificaciones">Certificaciones</MenuItem>
                  <MenuItem value="Reconocimientos académicos">
                    Reconocimientos académicos
                  </MenuItem>
                  <MenuItem value="Otros">Otros</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default AchievementsForm;