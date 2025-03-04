import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/certificaciones", 
});

// Profesores
export const getProfesores = () => api.get("/profesores");
export const newProfesor = (data) => api.post("/profesores", data);

// Certificaciones
export const agregarCertificacion = (data) => api.post("/certificaciones", data);

// Aptitudes
export const agregarAptitudes = (data) => api.post("/aptitudes", data);

// Educación
export const agregarEducacion = (data) => api.post("/educacion", data);

// Experiencia
export const agregarExperiencia = (data) => api.post("/experiencia", data);

// Idiomas
export const agregarIdiomas = (data) => api.post("/idiomas", data);

// Logros
export const agregarLogros = (data) => api.post("/logros", data);

// CV por profesor
export const getCvComplete = (profesorId) => api.get(`/cv/${profesorId}`);

// CV por usuario
export const getCvByUserId = (userId) => api.get(`/cv/user/${userId}`);

export default api;
