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
  InputAdornment,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { motion } from "framer-motion";

const validationSchema = Yup.object({
  cedula_profesional: Yup.string()
    .required("La cédula profesional es obligatoria")
    .max(20, "Máximo 20 caracteres"),
  tipo: Yup.string().required("El tipo de educación es obligatorio").max(50, "Máximo 50 caracteres"),
  carrera: Yup.string().required("La carrera es obligatoria").max(100, "Máximo 100 caracteres"),
  institucion: Yup.string().required("La institución es obligatoria").max(100, "Máximo 100 caracteres"),
  fecha_ingreso: Yup.date().required("La fecha de ingreso es obligatoria"),
  fecha_egreso: Yup.date().required("La fecha de egreso es obligatoria"),
  anotaciones: Yup.string().max(500, "Máximo 500 caracteres"),
});

const EducationForm = () => {
  const [educations, setEducations] = useState([{}]);

  const addEducation = () => {
    setEducations([...educations, {}]);
  };

  const removeEducation = (index) => {
    if (index === 0) return;
    setEducations(educations.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#4A7C59", fontWeight: "bold" }}>
        Educación
      </Typography>
      <Stack spacing={3}>
        {educations.map((_, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <EducationCard index={index} educations={educations} setEducations={setEducations} onRemove={() => removeEducation(index)} />
          </motion.div>
        ))}
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={addEducation}
          sx={{ backgroundColor: "#A6D785", borderRadius: 2, '&:hover': { backgroundColor: "#8BC34A" } }}
        >
          Agregar otra educación
        </Button>
      </Stack>
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
    validationSchema,
    onSubmit: (values) => {
      const updatedEducations = [...educations];
      updatedEducations[index] = values;
      setEducations(updatedEducations);
    },
  });

  return (
    <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#A6D785" }}>
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SchoolIcon />
                </InputAdornment>
              ),
            }}
            required
          />

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
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarTodayIcon />
                </InputAdornment>
              ),
            }}
            required
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#A6D785", borderRadius: 2 }}>
            Guardar Educación
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EducationForm;
