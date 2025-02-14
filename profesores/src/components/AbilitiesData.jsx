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
  aptitud: Yup.string()
    .required("La aptitud es obligatoria")
    .max(100, "La aptitud no puede tener más de 100 caracteres"),
  descripcion: Yup.string()
    .required("La descripción es obligatoria")
    .max(500, "La descripción no puede tener más de 500 caracteres"),
});

const AbilitiesForm = () => {
  const [abilities, setAbilities] = useState([{}]);

  const addAbility = () => {
    setAbilities([...abilities, {}]);
  };

  const removeAbility = (index) => {
    if (index === 0) return; // Evitar eliminar el primer card
    const updatedAbilities = abilities.filter((_, i) => i !== index);
    setAbilities(updatedAbilities);
  };

  const handleSubmitAll = () => {
    console.log("Habilidades enviadas:", abilities);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Habilidades y Aptitudes
      </Typography>
      <Stack spacing={3}>
        {abilities.map((_, index) => (
          <AbilityCard
            key={index}
            index={index}
            abilities={abilities}
            setAbilities={setAbilities}
            onRemove={() => removeAbility(index)}
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addAbility}
        sx={{ mt: 2 }}
      >
        Agregar otra habilidad
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitAll}
        sx={{ mt: 2, ml: 2 }}
      >
        Guardar todas las habilidades
      </Button>
    </Container>
  );
};

const AbilityCard = ({ index, abilities, setAbilities, onRemove }) => {
  const formik = useFormik({
    initialValues: abilities[index] || {
      aptitud: "",
      descripcion: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const updatedAbilities = [...abilities];
      updatedAbilities[index] = values;
      setAbilities(updatedAbilities);
      console.log("Habilidad actualizada:", values);
    },
  });

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Habilidad #{index + 1}
          </Typography>
          {index !== 0 && (
          <IconButton onClick={onRemove} color="error">
            <DeleteIcon />
          </IconButton>
             )}
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          {/* Aptitud */}
          <TextField
            fullWidth
            label="Aptitud"
            name="aptitud"
            value={formik.values.aptitud}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.aptitud && Boolean(formik.errors.aptitud)}
            helperText={formik.touched.aptitud && formik.errors.aptitud}
            margin="normal"
            required
          />

          {/* Descripción */}
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={formik.values.descripcion}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
            helperText={formik.touched.descripcion && formik.errors.descripcion}
            margin="normal"
            multiline
            rows={4}
            required
          />

          {/* Botón de Envío */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Guardar Habilidad
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AbilitiesForm;
