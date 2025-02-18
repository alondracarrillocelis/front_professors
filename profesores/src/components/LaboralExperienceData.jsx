import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
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
  InputAdornment,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import EventIcon from "@mui/icons-material/Event";

const validationSchema = Yup.object({
  id_profesor: Yup.string().required("El ID del profesor es obligatorio"),
  empresa: Yup.string()
    .required("El nombre de la empresa es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  cargo: Yup.string()
    .required("El cargo es obligatorio")
    .max(100, "Máximo 100 caracteres"),
  fecha_inicio: Yup.date().required("La fecha de inicio es obligatoria"),
  fecha_finalizacion: Yup.date()
    .nullable()
    .when("actual", {
      is: false,
      then: Yup.date().required("La fecha de finalización es obligatoria"),
    }),
  referencia: Yup.string()
    .required("La referencia es obligatoria")
    .max(100, "Máximo 100 caracteres"),
  anotaciones: Yup.string().max(500, "Máximo 500 caracteres").nullable(),
  actual: Yup.boolean(),
  funciones: Yup.string()
    .required("Las funciones son obligatorias")
    .max(1000, "Máximo 1000 caracteres"),
});

const LaboralExperienceForm = () => {
  const [experiences, setExperiences] = useState([{}]);

  const addExperience = () => {
    setExperiences([...experiences, {}]);
  };

  const removeExperience = (index) => {
    if (index === 0) return;
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const handleSubmitAll = () => {
    console.log("Experiencias enviadas:", experiences);
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
            onRemove={() => removeExperience(index)}
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addExperience}
        sx={{ mt: 2, borderColor: "#A6D785", color: "#A6D785" }}
      >
        Agregar otro trabajo
      </Button>
      <Button
        variant="contained"
        sx={{ mt: 2, ml: 2, bgcolor: "#A6D785", color: "black" }}
        onClick={handleSubmitAll}
      >
        Guardar todas las experiencias
      </Button>
    </Container>
  );
};

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
    validationSchema,
    onSubmit: (values) => {
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = values;
      setExperiences(updatedExperiences);
    },
  });

  return (
    <motion.div whileHover={{ scale: 1.02 }}>
      <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "#A6D785" }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Experiencia #{index + 1}</Typography>
            {index !== 0 && (
              <IconButton onClick={onRemove} sx={{ color: "#A6D785" }}>
                <DeleteIcon />
              </IconButton>
            )}
          </Stack>
          <form onSubmit={formik.handleSubmit}>
            <TextField fullWidth label="ID Profesor" name="id_profesor" {...formik.getFieldProps("id_profesor")} margin="normal" required />
            <TextField fullWidth label="Empresa" name="empresa" {...formik.getFieldProps("empresa")} margin="normal" required InputProps={{ startAdornment: (<InputAdornment position="start"><BusinessIcon /></InputAdornment>) }} />
            <TextField fullWidth label="Cargo" name="cargo" {...formik.getFieldProps("cargo")} margin="normal" required InputProps={{ startAdornment: (<InputAdornment position="start"><WorkIcon /></InputAdornment>) }} />
            <TextField fullWidth label="Fecha de Inicio" name="fecha_inicio" type="date" {...formik.getFieldProps("fecha_inicio")} margin="normal" InputLabelProps={{ shrink: true }} required InputProps={{ startAdornment: (<InputAdornment position="start"><EventIcon /></InputAdornment>) }} />
            {!formik.values.actual && <TextField fullWidth label="Fecha de Finalización" name="fecha_finalizacion" type="date" {...formik.getFieldProps("fecha_finalizacion")} margin="normal" InputLabelProps={{ shrink: true }} required />}
            <FormControlLabel control={<Checkbox {...formik.getFieldProps("actual")} />} label="¿Trabajo actual?" />
            <TextField fullWidth label="Referencia" name="referencia" {...formik.getFieldProps("referencia")} margin="normal" required />
            <TextField fullWidth label="Anotaciones" name="anotaciones" {...formik.getFieldProps("anotaciones")} margin="normal" multiline rows={3} />
            <TextField fullWidth label="Funciones" name="funciones" {...formik.getFieldProps("funciones")} margin="normal" multiline rows={4} required />
            <Button type="submit" variant="contained" sx={{ mt: 2, bgcolor: "#A6D785", color: "black" }} fullWidth>
              Guardar Experiencia
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LaboralExperienceForm;
