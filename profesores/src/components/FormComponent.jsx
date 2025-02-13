import { useState } from "react";
import { Container, TextField, Button, Paper, Typography, MenuItem } from "@mui/material";

const FormComponent = () => {
  const [formData, setFormData] = useState({
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
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>Formulario de Registro</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Apellido Materno"
            name="apellido_materno"
            value={formData.apellido_materno}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Correo"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="CURP"
            name="curp"
            value={formData.curp}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Matrícula"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Fecha de Nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Calle"
            name="calle"
            value={formData.calle}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Código Postal"
            name="codigo_postal"
            value={formData.codigo_postal}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Colonia"
            name="colonia"
            value={formData.colonia}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Número Interior"
            name="numero_int"
            value={formData.numero_int}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Número Exterior"
            name="numero_ext"
            value={formData.numero_ext}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Celular"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Tipo de Sangre"
            name="tipo_sangre"
            value={formData.tipo_sangre}
            onChange={handleChange}
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
            value={formData.resumen_profesional}
            onChange={handleChange}
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

export default FormComponent;