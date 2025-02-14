import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, TextField, Button, Paper, Typography, Grid, MenuItem } from "@mui/material";
import { AccountCircle, Email, Phone, Home, Badge } from "@mui/icons-material";

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
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ color: "#A6D785", fontWeight: "bold", textAlign: "center" }}>
          Formulario de Registro
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {[{
              label: "Matrícula", name: "matricula", icon: <Badge />
            }, {
              label: "Nombre", name: "nombre", icon: <AccountCircle />
            }, {
              label: "Apellido Paterno", name: "apellido_paterno" },
              { label: "Apellido Materno", name: "apellido_materno" },
              { label: "CURP", name: "curp" },
              { label: "Celular", name: "celular", icon: <Phone /> },
              { label: "Correo", name: "correo", type: "email", icon: <Email /> },
              { label: "Calle", name: "calle", icon: <Home /> },
              { label: "Código Postal", name: "codigo_postal" },
              { label: "Colonia", name: "colonia" },
              { label: "Número Interior", name: "numero_int" },
              { label: "Número Exterior", name: "numero_ext" }
            ].map((field, index) => (
              <Grid key={index} item xs={12} sm={field.name.includes("apellido") ? 6 : 12}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                  required={!["numero_int", "fecha_nacimiento"].includes(field.name)}
                  InputProps={{ startAdornment: field.icon }}
                />
              </Grid>
            ))}
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
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{
                backgroundColor: "#A6D785",
                borderRadius: 3,
                '&:hover': { backgroundColor: "#8EC16D" },
                transition: "0.3s ease-in-out"
              }}>
                Enviar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default PersonalData;
