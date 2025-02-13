import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, TextField, Button, Paper, Typography, MenuItem } from "@mui/material";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  nombre: Yup.string()
    .min(1, "El nombre debe tener al menos 1 carácter")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre es obligatorio"),
  apellido_materno: Yup.string()
    .min(1, "El apellido materno debe tener al menos 1 carácter")
    .max(50, "El apellido materno no puede tener más de 50 caracteres")
    .required("El apellido materno es obligatorio"),
  correo: Yup.string()
    .email("Ingresa un correo válido")
    .max(100, "El correo no puede tener más de 100 caracteres")
    .required("El correo es obligatorio"),
  curp: Yup.string()
    .length(18, "La CURP debe tener exactamente 18 caracteres")
    .required("La CURP es obligatoria"),
  matricula: Yup.string()
    .max(20, "La matrícula no puede tener más de 20 caracteres")
    .required("La matrícula es obligatoria"),
  fecha_nacimiento: Yup.string()
    .nullable()
    .optional(),
  calle: Yup.string()
    .max(100, "La calle no puede tener más de 100 caracteres")
    .required("La calle es obligatoria"),
  codigo_postal: Yup.string()
    .max(10, "El código postal no puede tener más de 10 caracteres")
    .required("El código postal es obligatorio"),
  colonia: Yup.string()
    .max(20, "La colonia no puede tener más de 20 caracteres")
    .required("La colonia es obligatoria"),
  numero_int: Yup.string()
    .max(10, "El número interior no puede tener más de 10 caracteres")
    .nullable()
    .optional(),
  numero_ext: Yup.string()
    .max(10, "El número exterior no puede tener más de 10 caracteres")
    .required("El número exterior es obligatorio"),
  celular: Yup.string()
    .max(10, "El celular no puede tener más de 10 caracteres")
    .required("El celular es obligatorio"),
  tipo_sangre: Yup.string()
    .oneOf(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], "Tipo de sangre no válido")
    .required("El tipo de sangre es obligatorio"),
  resumen_profesional: Yup.string()
    .max(1000, "El resumen profesional no puede tener más de 1000 caracteres")
    .nullable()
    .optional(),
});

const PersonalData = () => {
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido_materno: "",
      correo: "",
      curp: "",
      matricula: "",
      fecha_nacimiento: "",
      calle: "",
      codigo_postal: "",
      colonia: "",
      numero_int: "",
      numero_ext: "",
      celular: "",
      tipo_sangre: "",
      resumen_profesional: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Datos enviados:", values);
      // Aquí puedes enviar los datos al backend
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Formulario de Registro</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nombre && Boolean(formik.errors.nombre)}
            helperText={formik.touched.nombre && formik.errors.nombre}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Apellido Materno"
            name="apellido_materno"
            value={formik.values.apellido_materno}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.apellido_materno && Boolean(formik.errors.apellido_materno)}
            helperText={formik.touched.apellido_materno && formik.errors.apellido_materno}
            margin="normal"
            required
          />
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
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="CURP"
            name="curp"
            value={formik.values.curp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.curp && Boolean(formik.errors.curp)}
            helperText={formik.touched.curp && formik.errors.curp}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Matrícula"
            name="matricula"
            value={formik.values.matricula}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.matricula && Boolean(formik.errors.matricula)}
            helperText={formik.touched.matricula && formik.errors.matricula}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Fecha de Nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={formik.values.fecha_nacimiento}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Calle"
            name="calle"
            value={formik.values.calle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.calle && Boolean(formik.errors.calle)}
            helperText={formik.touched.calle && formik.errors.calle}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Código Postal"
            name="codigo_postal"
            value={formik.values.codigo_postal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.codigo_postal && Boolean(formik.errors.codigo_postal)}
            helperText={formik.touched.codigo_postal && formik.errors.codigo_postal}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Colonia"
            name="colonia"
            value={formik.values.colonia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.colonia && Boolean(formik.errors.colonia)}
            helperText={formik.touched.colonia && formik.errors.colonia}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Número Interior"
            name="numero_int"
            value={formik.values.numero_int}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Número Exterior"
            name="numero_ext"
            value={formik.values.numero_ext}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.numero_ext && Boolean(formik.errors.numero_ext)}
            helperText={formik.touched.numero_ext && formik.errors.numero_ext}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Celular"
            name="celular"
            value={formik.values.celular}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.celular && Boolean(formik.errors.celular)}
            helperText={formik.touched.celular && formik.errors.celular}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Tipo de Sangre"
            name="tipo_sangre"
            value={formik.values.tipo_sangre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.tipo_sangre && Boolean(formik.errors.tipo_sangre)}
            helperText={formik.touched.tipo_sangre && formik.errors.tipo_sangre}
            margin="normal"
            required
            select
          >
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Resumen Profesional"
            name="resumen_profesional"
            value={formik.values.resumen_profesional}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            margin="normal"
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Enviar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default PersonalData;