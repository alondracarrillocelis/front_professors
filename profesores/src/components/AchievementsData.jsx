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
import { motion } from 'framer-motion';

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
    setAchievements([{ nombre: '', institucion: '', fecha: '', tipo: '' }]);
  };

  const addAchievement = () => {
    setAchievements([...achievements, { nombre: '', institucion: '', fecha: '', tipo: '' }]);
  };

  const removeAchievement = (index) => {
    if (index === 0) return;
    setAchievements(achievements.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Logros y Reconocimientos
      </Typography>
      <Stack spacing={3}>
        {achievements.map((achievement, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <AchievementCard
              index={index}
              achievement={achievement}
              handleChange={handleChange}
              onRemove={() => removeAchievement(index)}
            />
          </motion.div>
        ))}
      </Stack>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addAchievement}
        sx={{ mt: 2, borderRadius: 2, borderColor: '#A6D785', color: '#A6D785' }}
      >
        Agregar otro logro
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2, ml: 2, borderRadius: 2, backgroundColor: '#A6D785', color: 'white' }}
        onClick={handleSubmitAll}
      >
        Guardar todos los logros
      </Button>
    </Container>
  );
};

const AchievementCard = ({ index, achievement, handleChange, onRemove }) => {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, borderColor: '#A6D785' }}>
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
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Tipo de reconocimiento</InputLabel>
                <Select
                  name="tipo"
                  value={achievement.tipo}
                  onChange={(e) => handleChange(index, e)}
                >
                  <MenuItem value="Investigaciones">Investigaciones</MenuItem>
                  <MenuItem value="Publicaciones">Publicaciones</MenuItem>
                  <MenuItem value="Premios">Premios</MenuItem>
                  <MenuItem value="Certificaciones">Certificaciones</MenuItem>
                  <MenuItem value="Reconocimientos académicos">Reconocimientos académicos</MenuItem>
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
