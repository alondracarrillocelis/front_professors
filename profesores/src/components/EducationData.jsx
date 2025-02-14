import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  cedula_profesional: Yup.string()
    .required("La cédula profesional es obligatoria")
    .max(20, "La cédula profesional no puede tener más de 20 caracteres"),
  tipo: Yup.string()
    .required("El tipo de educación es obligatorio")
    .max(50, "El tipo no puede tener más de 50 caracteres"),
  carrera: Yup.string()
    .required("La carrera es obligatoria")
    .max(100, "La carrera no puede tener más de 100 caracteres"),
  institucion: Yup.string()
    .required("La institución es obligatoria")
    .max(100, "La institución no puede tener más de 100 caracteres"),
  fecha_ingreso: Yup.date()
    .required("La fecha de ingreso es obligatoria"),
  fecha_egreso: Yup.date()
    .required("La fecha de egreso es obligatoria"),
  anotaciones: Yup.string()
    .max(500, "Las anotaciones no pueden tener más de 500 caracteres"),
});

const EducationForm = () => {
  const [educations, setEducations] = useState([{}]);

  const addEducation = () => {
    setEducations([...educations, {}]);
  };

  const removeEducation = (index) => {
    if (index === 0) return; // Evitar eliminar el primer card

    const updatedEducations = educations.filter((_, i) => i !== index);
    setEducations(updatedEducations);
  };

  const handleSubmitAll = () => {
    console.log("Educaciones enviadas:", educations);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Educación
      </Typography>
      <Stack spacing={3}>
        {educations.map((_, index) => (
          <EducationCard
            key={index}
            index={index}
            educations={educations}
            setEducations={setEducations}
            onRemove={() => removeEducation(index)}
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addEducation}
        sx={{ mt: 2 }}
      >
        Agregar otra educación
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitAll}
        sx={{ mt: 2, ml: 2 }}
      >
        Guardar todas las educaciones
      </Button>
    </Container>
  );
};

const EducationCard = ({ index, educations, setEducations, onRemove }) => {
  const formik = useFormik({
    initialValues: educations[index] || {
      cedula_profesional: "",
      tipo: "",
      carrera: "",
      institucion: "",
      fecha_ingreso: "",
      fecha_egreso: "",
      anotaciones: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedEducations = [...educations];
      updatedEducations[index] = values;
      setEducations(updatedEducations);
      console.log("Educación actualizada:", values);
    },
  });

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Educación #{index + 1}
          </Typography>
          {index !== 0 && (
            <IconButton onClick={onRemove} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          {/* Cédula Profesional */}
          <TextField
            fullWidth
            label="Cédula Profesional"
            name="cedula_profesional"
            value={formik.values.cedula_profesional}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cedula_profesional && Boolean(formik.errors.cedula_profesional)}
            helperText={formik.touched.cedula_profesional && formik.errors.cedula_profesional}
            margin="normal"
            required
          />

          {/* Tipo */}
          <TextField
            fullWidth
            label="Tipo"
            name="tipo"
            value={formik.values.tipo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tipo && Boolean(formik.errors.tipo)}
            helperText={formik.touched.tipo && formik.errors.tipo}
            margin="normal"
            required
          />

          {/* Carrera */}
          <TextField
            fullWidth
            label="Carrera"
            name="carrera"
            value={formik.values.carrera}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.carrera && Boolean(formik.errors.carrera)}
            helperText={formik.touched.carrera && formik.errors.carrera}
            margin="normal"
            required
          />

          {/* Institución */}
          <TextField
            fullWidth
            label="Institución"
            name="institucion"
            value={formik.values.institucion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.institucion && Boolean(formik.errors.institucion)}
            helperText={formik.touched.institucion && formik.errors.institucion}
            margin="normal"
            required
          />

          {/* Fecha de Ingreso */}
          <TextField
            fullWidth
            label="Fecha de Ingreso"
            name="fecha_ingreso"
            type="date"
            value={formik.values.fecha_ingreso}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fecha_ingreso && Boolean(formik.errors.fecha_ingreso)}
            helperText={formik.touched.fecha_ingreso && formik.errors.fecha_ingreso}
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
          />

          {/* Fecha de Egreso */}
          <TextField
            fullWidth
            label="Fecha de Egreso"
            name="fecha_egreso"
            type="date"
            value={formik.values.fecha_egreso}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fecha_egreso && Boolean(formik.errors.fecha_egreso)}
            helperText={formik.touched.fecha_egreso && formik.errors.fecha_egreso}
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
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
            rows={4}
          />

          {/* Botón de Envío */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Guardar Educación
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EducationForm;