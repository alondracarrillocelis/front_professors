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
import { grey } from "@mui/material/colors";

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
        startIcon={<AddCircleOutlineIcon sx={{ color: grey[500] }} />}
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
          {index !== 0 && (
            <IconButton onClick={onRemove} sx={{ color: grey[500] }}>
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <TextField fullWidth label="ID Profesor" name="id_profesor" {...formik.getFieldProps("id_profesor")} margin="normal" required />
          <TextField fullWidth label="Empresa" name="empresa" {...formik.getFieldProps("empresa")} margin="normal" required />
          <TextField fullWidth label="Cargo" name="cargo" {...formik.getFieldProps("cargo")} margin="normal" required />
          <TextField fullWidth label="Fecha de Inicio" name="fecha_inicio" type="date" {...formik.getFieldProps("fecha_inicio")} margin="normal" InputLabelProps={{ shrink: true }} required />
          {!formik.values.actual && <TextField fullWidth label="Fecha de Finalización" name="fecha_finalizacion" type="date" {...formik.getFieldProps("fecha_finalizacion")} margin="normal" InputLabelProps={{ shrink: true }} required />}
          <FormControlLabel control={<Checkbox {...formik.getFieldProps("actual")} />} label="¿Trabajo actual?" />
          <TextField fullWidth label="Referencia" name="referencia" {...formik.getFieldProps("referencia")} margin="normal" required />
          <TextField fullWidth label="Anotaciones" name="anotaciones" {...formik.getFieldProps("anotaciones")} margin="normal" multiline rows={3} />
          <TextField fullWidth label="Funciones" name="funciones" {...formik.getFieldProps("funciones")} margin="normal" multiline rows={4} required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Guardar Experiencia
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LaboralExperienceForm;
