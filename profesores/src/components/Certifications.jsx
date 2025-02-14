import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { motion } from 'framer-motion';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';

const CertificationsForm = ({ onSubmit }) => {
  const [certifications, setCertifications] = useState([{ name: '', institution: '', date: '' }]);

  const handleChange = (index, e) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index][e.target.name] = e.target.value;
    setCertifications(updatedCertifications);
  };

  const handleSubmitAll = () => {
    onSubmit(certifications);
    setCertifications([{ name: '', institution: '', date: '' }]); // Reiniciar después de enviar
  };

  const addCertification = () => {
    setCertifications([...certifications, { name: '', institution: '', date: '' }]);
  };

  const removeCertification = (index) => {
    if (index === 0) return; // Evitar eliminar el primer card
    setCertifications(certifications.filter((_, i) => i !== index));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Certificaciones
      </Typography>
      <Stack spacing={3}>
        {certifications.map((certification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CertificationCard
              index={index}
              certification={certification}
              handleChange={handleChange}
              onRemove={() => removeCertification(index)}
            />
          </motion.div>
        ))}
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          onClick={addCertification}
          sx={{
            backgroundColor: '#A6D785',
            color: '#fff',
            '&:hover': { backgroundColor: '#8FCB69' },
            borderRadius: 2,
          }}
        >
          Agregar otra certificación
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitAll}
          sx={{
            backgroundColor: '#A6D785',
            color: '#fff',
            '&:hover': { backgroundColor: '#8FCB69' },
            borderRadius: 2,
          }}
        >
          Guardar todas las certificaciones
        </Button>
      </Stack>
    </Container>
  );
};

const CertificationCard = ({ index, certification, handleChange, onRemove }) => {
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 3, borderColor: '#A6D785', boxShadow: 2 }}
      component={motion.div}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Certificación #{index + 1}
          </Typography>
          {index !== 0 && (
            <IconButton onClick={onRemove} sx={{ color: '#D32F2F' }}>
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre de la Certificación"
              name="name"
              value={certification.name}
              onChange={(e) => handleChange(index, e)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SchoolIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Institución"
              name="institution"
              value={certification.institution}
              onChange={(e) => handleChange(index, e)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BusinessIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Fecha de obtención"
              name="date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={certification.date}
              onChange={(e) => handleChange(index, e)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EventIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CertificationsForm;
