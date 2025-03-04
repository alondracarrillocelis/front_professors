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
  Snackbar,
  Alert,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import SchoolIcon from "@mui/icons-material/School";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { motion } from "framer-motion";
import { agregarEducacion } from "../api"; // Importa la función para consumir el endpoint

const validationSchema = Yup.object({
  cedula_profesional: Yup.string().required("La cédula profesional es obligatoria").max(20),
  tipo: Yup.string().required("El tipo de educación es obligatorio").max(50),
  carrera: Yup.string().required("La carrera es obligatoria").max(100),
  institucion: Yup.string().required("La institución es obligatoria").max(100),
  fecha_ingreso: Yup.date().required("La fecha de ingreso es obligatoria"),
  fecha_egreso: Yup.date().required("La fecha de egreso es obligatoria"),
  anotaciones: Yup.string().max(500),
});

const EducationForm = () => {
  const [educations, setEducations] = useState([{}]);
  const [feedback, setFeedback] = useState({ open: false, message: "", severity: "success" });

  const addEducation = () => {
    setEducations([...educations, {}]);
  };

  const removeEducation = (index) => {
    if (index === 0) return;
    setEducations(educations.filter((_, i) => i !== index));
  };

  const showFeedback = (message, severity) => {
    setFeedback({ open: true, message, severity });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "#4A7C59", fontWeight: "bold" }}>
        Educación
      </Typography>
      <Stack spacing={3}>
        {educations.map((_, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            <EducationCard 
              index={index} 
              educations={educations} 
              setEducations={setEducations} 
              onRemove={() => removeEducation(index)} 
              showFeedback={showFeedback} // Pasamos la función de feedback al componente
            />
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

      {/* Feedback Snackbar */}
      <Snackbar 
        open={feedback.open} 
        autoHideDuration={3000} 
        onClose={() => setFeedback({ ...feedback, open: false })} 
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} 
      >
        <Alert 
          onClose={() => setFeedback({ ...feedback, open: false })} 
          severity={feedback.severity} 
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

const EducationCard = ({ index, educations, setEducations, onRemove, showFeedback }) => {
  const formik = useFormik({
    initialValues: {
      cedula_profesional: "",
      tipo: "",
      carrera: "",
      institucion: "",
      fecha_ingreso: "",
      fecha_egreso: "",
      anotaciones: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await agregarEducacion(values); // Enviar los datos al backend
        const updatedEducations = [...educations];
        updatedEducations[index] = values;
        setEducations(updatedEducations);
        resetForm();
        showFeedback("Educación guardada exitosamente", "success");
      } catch (error) {
        console.error("Error al agregar educación:", error);
        showFeedback("Hubo un error al guardar la educación", "error");
      } finally {
        setSubmitting(false);
      }
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
          <TextField fullWidth label="Cédula Profesional" name="cedula_profesional" {...formik.getFieldProps("cedula_profesional")} margin="normal" required />
          <TextField fullWidth label="Tipo de Educación" name="tipo" {...formik.getFieldProps("tipo")} margin="normal" required />
          <TextField fullWidth label="Carrera" name="carrera" {...formik.getFieldProps("carrera")} margin="normal" required />
          <TextField fullWidth label="Institución" name="institucion" {...formik.getFieldProps("institucion")} margin="normal" required />
          <TextField fullWidth label="Fecha de Ingreso" name="fecha_ingreso" type="date" {...formik.getFieldProps("fecha_ingreso")} margin="normal" InputLabelProps={{ shrink: true }} required />
          <TextField fullWidth label="Fecha de Egreso" name="fecha_egreso" type="date" {...formik.getFieldProps("fecha_egreso")} margin="normal" InputLabelProps={{ shrink: true }} required />
          <TextField fullWidth label="Anotaciones" name="anotaciones" multiline rows={3} {...formik.getFieldProps("anotaciones")} margin="normal" />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#A6D785", borderRadius: 2 }}>
            Guardar Educación
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EducationForm;
