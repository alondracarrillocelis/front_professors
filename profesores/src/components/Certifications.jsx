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
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

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

    const updatedCertifications = certifications.filter((_, i) => i !== index);
    setCertifications(updatedCertifications);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Certificaciones
      </Typography>
      <Stack spacing={3}>
        {certifications.map((certification, index) => (
          <CertificationCard
            key={index}
            index={index}
            certification={certification}
            handleChange={handleChange}
            onRemove={() => removeCertification(index)}
          />
        ))}
      </Stack>
      <Button
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        onClick={addCertification}
        sx={{ mt: 2 }}
      >
        Agregar otra certificación
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitAll}
        sx={{ mt: 2, ml: 2 }}
      >
        Guardar todas las certificaciones
      </Button>
    </Container>
  );
};

const CertificationCard = ({ index, certification, handleChange, onRemove }) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Certificación #{index + 1}
          </Typography>
          {index !== 0 && (
            <IconButton onClick={onRemove} color="error">
              <DeleteIcon />
            </IconButton>
          )}
        </Stack>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de la Certificación"
                name="name"
                value={certification.name}
                onChange={(e) => handleChange(index, e)}
                required
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
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default CertificationsForm;