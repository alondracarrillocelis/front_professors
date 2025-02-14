import { useState } from "react";
import { Button, TextField, Container, Typography } from "@mui/material";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (username === "admin" && password === "password") {
            onLogin();
        } else {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <>
            <div className="header">
                <img
                    src="https://i0.wp.com/utd.edu.mx/wp-content/uploads/2022/07/LOGO-UTD-NUEVO-2022_solo-01.png?fit=1024%2C387&ssl=1"
                    alt="Company Logo"
                    className="logo"
                    draggable="false"
                />
                <div className="content">
                    <h1>Envía tu CV</h1>
                    <p>Haz visible tu persona para que nosotros te contactemos</p>
                </div>
            </div>
            <Container maxWidth="sm" sx={{ mt: 10, p: 4, boxShadow: 3, borderRadius: 2, backgroundColor: 'white' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Iniciar Sesión
                </Typography>
                <TextField
                    label="Usuario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
                        Iniciar sesión
                    </Button>
                </div>
            </Container>

            <style jsx>{`
                .header {
                    display: flex;
                    align-items: center;
                    padding: 20px;
                    border-bottom: 15px solid #6A6A6A;
                    background-color: white;
                    gap: 32px;
                    width: 100%;    
                }

                .logo {
                    height: 48px;
                    width: 128px; 
                    margin-right: 16px; 
                }

                .content {
                    flex: 1;
                }

                .content h1 {
                    font-size: 1.875rem; /* text-3xl */
                    font-weight: bold;
                    margin: 0;
                }

                .content p {
                    font-size: 1.125rem; /* text-lg */
                    color: #4b5563; /* text-gray-600 */
                    margin: 0;
                }
            `}</style>
        </>
    );
};

export default Login;
