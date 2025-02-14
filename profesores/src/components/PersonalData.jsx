import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, TextField, Button, Paper, Typography, Grid, MenuItem } from "@mui/material";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  nombre: Yup.string().min(1).max(50).required("El nombre es obligatorio"),
  apellido_paterno: Yup.string().min(1).max(50).required("El apellido paterno es obligatorio"),
  apellido_materno: Yup.string().min(1).max(50).required("El apellido materno es obligatorio"),
  correo: Yup.string().email("Ingresa un correo válido").max(100).required("El correo es obligatorio"),
  curp: Yup.string().length(18, "La CURP debe tener 18 caracteres").required("La CURP es obligatoria"),
  matricula: Yup.string().max(20).required("La matrícula es obligatoria"),
  fecha_nacimiento: Yup.string().nullable().optional(),
  celular: Yup.string().max(10).required("El celular es obligatorio"),
  tipo_sangre: Yup.string().oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).required("El tipo de sangre es obligatorio"),
  calle: Yup.string().max(100).required("La calle es obligatoria"),
  codigo_postal: Yup.string().max(10).required("El código postal es obligatorio"),
  colonia: Yup.string().max(20).required("La colonia es obligatoria"),
  numero_int: Yup.string().max(10).nullable().optional(),
  numero_ext: Yup.string().max(10).required("El número exterior es obligatorio"),
  resumen_profesional: Yup.string().max(1000).nullable().optional(),
});

const PersonalData = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      correo: "",
      curp: "",
      matricula: "",
      fecha_nacimiento: "",
      celular: "",
      tipo_sangre: "",
      calle: "",
      codigo_postal: "",
      colonia: "",
      numero_int: "",
      numero_ext: "",
      resumen_profesional: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Datos enviados:", values);
    },
  });

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Formulario de Registro</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Matrícula"
                name="matricula"
                value={formik.values.matricula}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.matricula && Boolean(formik.errors.matricula)}
                helperText={formik.touched.matricula && formik.errors.matricula}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                helperText={formik.touched.nombre && formik.errors.nombre}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido Paterno"
                name="apellido_paterno"
                value={formik.values.apellido_paterno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.apellido_paterno && Boolean(formik.errors.apellido_paterno)}
                helperText={formik.touched.apellido_paterno && formik.errors.apellido_paterno}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Apellido Materno"
                name="apellido_materno"
                value={formik.values.apellido_materno}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.apellido_materno && Boolean(formik.errors.apellido_materno)}
                helperText={formik.touched.apellido_materno && formik.errors.apellido_materno}
                required
              />
            </Grid>

       
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CURP"
                name="curp"
                value={formik.values.curp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.curp && Boolean(formik.errors.curp)}
                helperText={formik.touched.curp && formik.errors.curp}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tipo de Sangre"
                name="tipo_sangre"
                value={formik.values.tipo_sangre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.tipo_sangre && Boolean(formik.errors.tipo_sangre)}
                helperText={formik.touched.tipo_sangre && formik.errors.tipo_sangre}
                required
                select
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                ))}
              </TextField>
            </Grid>
           
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha de Nacimiento"
                name="fecha_nacimiento"
                type="date"
                value={formik.values.fecha_nacimiento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {/* Celular y Tipo de Sangre */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Celular"
                name="celular"
                value={formik.values.celular}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.celular && Boolean(formik.errors.celular)}
                helperText={formik.touched.celular && formik.errors.celular}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Correo"
                name="correo"
                type="email"
                value={formik.values.correo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.correo && Boolean(formik.errors.correo)}
                helperText={formik.touched.correo && formik.errors.correo}
                required
              />
            </Grid>
          

            {/* Dirección */}
            <Grid item xs={12}>
              <TextField fullWidth label="Calle" name="calle" required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Código Postal" name="codigo_postal" required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Colonia" name="colonia" required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Número Interior" name="numero_int" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Número Exterior" name="numero_ext" required />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>Enviar</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PersonalData;
