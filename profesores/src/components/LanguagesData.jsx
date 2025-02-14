import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Stack,
  IconButton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const LanguageForm = ({ onSubmit }) => {
  const [languages, setLanguages] = useState([{ language: '', proficiency: '' }]);

  const validationSchema = Yup.object({
    language: Yup.string().required('Campo obligatorio'),
    proficiency: Yup.string().required('Campo obligatorio'),
  });

  const handleSubmitAll = () => {
    onSubmit(languages);
    setLanguages([{ language: '', proficiency: '' }]); // Reiniciar después de enviar
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: '', proficiency: '' }]);
  };

  const removeLanguage = (index) => {
    if (index === 0) return; // Evitar eliminar el primer card
    const updatedLanguages = languages.filter((_, i) => i !== index);
    setLanguages(updatedLanguages);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Idiomas
      </Typography>
      <Stack spacing={3}>
        {languages.map((language, index) => (
          <LanguageCard
            key={index}
            index={index}
            language={language}
            setLanguages={setLanguages}
            onRemove={() => removeLanguage(index)}
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addLanguage}
        sx={{ mt: 2 }}
      >
        Agregar otro idioma
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitAll}
        sx={{ mt: 2, ml: 2 }}
      >
        Guardar todos los idiomas
      </Button>
    </Container>
  );
};

const LanguageCard = ({ index, language, setLanguages, onRemove }) => {
  const formik = useFormik({
    initialValues: language,
    validationSchema: Yup.object({
      language: Yup.string().required('Campo obligatorio'),
      proficiency: Yup.string().required('Campo obligatorio'),
    }),
    onSubmit: (values) => {
      const updatedLanguages = [...languages];
      updatedLanguages[index] = values;
      setLanguages(updatedLanguages);
    },
  });

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Idioma #{index + 1}
          </Typography>
          {/* Ocultar el botón de eliminar en el primer card */}
          {index !== 0 && (
            <IconButton onClick={onRemove} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* Idioma */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Idioma"
                name="language"
                value={formik.values.language}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.language && Boolean(formik.errors.language)}
                helperText={formik.touched.language && formik.errors.language}
              />
            </Grid>

            {/* Nivel de dominio */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Nivel de Dominio"
                name="proficiency"
                value={formik.values.proficiency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.proficiency && Boolean(formik.errors.proficiency)}
                helperText={formik.touched.proficiency && formik.errors.proficiency}
              >
                <MenuItem value="Básico">Básico</MenuItem>
                <MenuItem value="Intermedio">Intermedio</MenuItem>
                <MenuItem value="Avanzado">Avanzado</MenuItem>
                <MenuItem value="Nativo">Nativo</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Guardar Idioma
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LanguageForm;