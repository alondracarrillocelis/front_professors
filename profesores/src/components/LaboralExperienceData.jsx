import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Stack,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  id_profesor: Yup.string().required("El ID del profesor es obligatorio"),
  empresa: Yup.string()
    .required("El nombre de la empresa es obligatorio")
    .max(100, "El nombre de la empresa no puede tener más de 100 caracteres"),
  cargo: Yup.string()
    .required("El cargo es obligatorio")
    .max(100, "El cargo no puede tener más de 100 caracteres"),
  fecha_inicio: Yup.date().required("La fecha de inicio es obligatoria"),
  fecha_finalizacion: Yup.date()
    .nullable()
    .when("actual", {
      is: false,
      then: Yup.date().required("La fecha de finalización es obligatoria si no está actual"),
    }),
  referencia: Yup.string()
    .required("La referencia es obligatoria")
    .max(100, "La referencia no puede tener más de 100 caracteres"),
  anotaciones: Yup.string()
    .max(500, "Las anotaciones no pueden tener más de 500 caracteres")
    .nullable(),
  actual: Yup.boolean(),
  funciones: Yup.string()
    .required("Las funciones son obligatorias")
    .max(1000, "Las funciones no pueden tener más de 1000 caracteres"),
});

const LaboralExperienceForm = () => {
  const [experiences, setExperiences] = useState([{}]); // Estado para manejar múltiples experiencias

  // Función para agregar una nueva experiencia
  const addExperience = () => {
    setExperiences([...experiences, {}]);
  };

  // Función para eliminar una experiencia
  const removeExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  // Función para manejar el envío de todas las experiencias
  const handleSubmitAll = () => {
    console.log("Experiencias enviadas:", experiences);
    // Aquí puedes enviar los datos al backend
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Experiencias Laborales
      </Typography>
      <Stack spacing={3}>
        {experiences.map((_, index) => (
          <ExperienceCard
            key={index}
            index={index}
            experiences={experiences}
            setExperiences={setExperiences}
            onRemove={() => removeExperience(index)} // Pasar la función para eliminar
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addExperience}
        sx={{ mt: 2 }}
      >
        Agregar otro trabajo
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitAll}
        sx={{ mt: 2, ml: 2 }}
      >
        Guardar todas las experiencias
      </Button>
    </Container>
  );
};

// Componente de la tarjeta de experiencia laboral
const ExperienceCard = ({ index, experiences, setExperiences, onRemove }) => {
  const formik = useFormik({
    initialValues: experiences[index] || {
      id_profesor: "",
      empresa: "",
      cargo: "",
      fecha_inicio: "",
      fecha_finalizacion: "",
      referencia: "",
      anotaciones: "",
      actual: false,
      funciones: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = values;
      setExperiences(updatedExperiences);
      console.log("Experiencia actualizada:", values);
    },
  });

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Experiencia Laboral #{index + 1}
          </Typography>
          <IconButton onClick={onRemove} color="error">
            <DeleteIcon />
          </IconButton>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          {/* ID Profesor */}
          <TextField
            fullWidth
            label="ID Profesor"
            name="id_profesor"
            value={formik.values.id_profesor}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.id_profesor && Boolean(formik.errors.id_profesor)}
            helperText={formik.touched.id_profesor && formik.errors.id_profesor}
            margin="normal"
            required
          />

          {/* Empresa */}
          <TextField
            fullWidth
            label="Empresa"
            name="empresa"
            value={formik.values.empresa}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.empresa && Boolean(formik.errors.empresa)}
            helperText={formik.touched.empresa && formik.errors.empresa}
            margin="normal"
            required
          />

          {/* Cargo */}
          <TextField
            fullWidth
            label="Cargo"
            name="cargo"
            value={formik.values.cargo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cargo && Boolean(formik.errors.cargo)}
            helperText={formik.touched.cargo && formik.errors.cargo}
            margin="normal"
            required
          />

          {/* Fecha de Inicio */}
          <TextField
            fullWidth
            label="Fecha de Inicio"
            name="fecha_inicio"
            type="date"
            value={formik.values.fecha_inicio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fecha_inicio && Boolean(formik.errors.fecha_inicio)}
            helperText={formik.touched.fecha_inicio && formik.errors.fecha_inicio}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />

          {/* Fecha de Finalización */}
          {!formik.values.actual && (
            <TextField
              fullWidth
              label="Fecha de Finalización"
              name="fecha_finalizacion"
              type="date"
              value={formik.values.fecha_finalizacion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fecha_finalizacion && Boolean(formik.errors.fecha_finalizacion)}
              helperText={formik.touched.fecha_finalizacion && formik.errors.fecha_finalizacion}
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
            />
          )}

          {/* Actual */}
          <FormControlLabel
            control={
              <Checkbox
                name="actual"
                checked={formik.values.actual}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label="¿Trabajo actual?"
          />

          {/* Referencia */}
          <TextField
            fullWidth
            label="Referencia"
            name="referencia"
            value={formik.values.referencia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.referencia && Boolean(formik.errors.referencia)}
            helperText={formik.touched.referencia && formik.errors.referencia}
            margin="normal"
            required
          />

          {/* Anotaciones */}
          <TextField
            fullWidth
            label="Anotaciones"
            name="anotaciones"
            value={formik.values.anotaciones}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.anotaciones && Boolean(formik.errors.anotaciones)}
            helperText={formik.touched.anotaciones && formik.errors.anotaciones}
            margin="normal"
            multiline
            rows={3}
          />

          {/* Funciones */}
          <TextField
            fullWidth
            label="Funciones"
            name="funciones"
            value={formik.values.funciones}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.funciones && Boolean(formik.errors.funciones)}
            helperText={formik.touched.funciones && formik.errors.funciones}
            margin="normal"
            multiline
            rows={4}
            required
          />

          {/* Botón de Envío */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Guardar Experiencia
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LaboralExperienceForm;