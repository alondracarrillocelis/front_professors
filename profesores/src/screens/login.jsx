import { useState } from "react";
import { loginUser, registerUser } from "../services/authServices";
import { TextField, Button, Card, CardContent, Typography, Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      if (isRegistering) {
        await registerUser(email, password);
        setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
      } else {
        const data = await loginUser(email, password);
        alert(`Bienvenido ${data.user.email}`);
      }
    } catch (err) {
      setError("Ocurrió un error. Verifica tus datos e intenta de nuevo.");
    }
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card sx={{ maxWidth: 600, mx: "auto", mt: 8, p: 6, boxShadow: 8, borderRadius: 4, background: "#2E7D32", color: "white" }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" mb={3} fontWeight="bold">
            {isRegistering ? "Registrarse" : "Iniciar Sesión"}
          </Typography>

          {error && (
            <Typography variant="body1" sx={{ color: "#FFCDD2", textAlign: "center", mb: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography variant="body1" sx={{ color: "#C8E6C9", textAlign: "center", mb: 2 }}>
              {success}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
              <TextField
                label="Correo"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ input: { color: "white" }, fieldset: { borderColor: "#C8E6C9" } }}
              />
              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ input: { color: "white" }, fieldset: { borderColor: "#C8E6C9" } }}
              />
            </motion.div>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 2, backgroundColor: "#A6D785", '&:hover': { backgroundColor: "#8EC16D" } }} disabled={loading}>
              {loading ? <CircularProgress size={26} sx={{ color: "white" }} /> : isRegistering ? "Registrarse" : "Ingresar"}
            </Button>
          </form>

          <Box textAlign="center" mt={3}>
            <Button color="secondary" onClick={() => setIsRegistering(!isRegistering)} sx={{ color: "#C8E6C9" }}>
              {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Login;
