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
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import LanguageIcon from '@mui/icons-material/Language';
import SchoolIcon from '@mui/icons-material/School';

const LanguageForm = ({ onSubmit }) => {
  const [languages, setLanguages] = useState([{ language: '', proficiency: '' }]);

  const handleSubmitAll = () => {
    onSubmit(languages);
    setLanguages([{ language: '', proficiency: '' }]); // Reiniciar después de enviar
  };

  const addLanguage = () => {
    setLanguages([...languages, { language: '', proficiency: '' }]);
  };

  const removeLanguage = (index) => {
    if (index === 0) return; // Evitar eliminar el primer card
    setLanguages(languages.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Idiomas
      </Typography>
      <Stack spacing={3}>
        {languages.map((language, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LanguageCard
              index={index}
              language={language}
              setLanguages={setLanguages}
              onRemove={() => removeLanguage(index)}
            />
          </motion.div>
        ))}
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={addLanguage}
          sx={{
            backgroundColor: '#A6D785',
            color: '#fff',
            '&:hover': { backgroundColor: '#8FCB69' },
            borderRadius: 2,
          }}
        >
          Agregar otro idioma
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmitAll}
          sx={{
            backgroundColor: '#A6D785',
            color: '#fff',
            '&:hover': { backgroundColor: '#8FCB69' },
            borderRadius: 2,
          }}
        >
          Guardar todos los idiomas
        </Button>
      </Stack>
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
    <Card
      variant="outlined"
      sx={{ borderRadius: 3, borderColor: '#A6D785', boxShadow: 2 }}
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Idioma #{index + 1}
          </Typography>
          {index !== 0 && (
            <IconButton onClick={onRemove} sx={{ color: '#D32F2F' }}>
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon />
                    </InputAdornment>
                  ),
                }}
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
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon />
                    </InputAdornment>
                  ),
                }}
              >
                <MenuItem value="Básico">Básico</MenuItem>
                <MenuItem value="Intermedio">Intermedio</MenuItem>
                <MenuItem value="Avanzado">Avanzado</MenuItem>
                <MenuItem value="Nativo">Nativo</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#A6D785',
              color: '#fff',
              '&:hover': { backgroundColor: '#8FCB69' },
              borderRadius: 2,
            }}
          >
            Guardar Idioma
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LanguageForm;
