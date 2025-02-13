import { useState } from "react";
import { Stepper, Step, StepLabel, Button, Container, Typography, StepConnector, stepConnectorClasses, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import PersonalData from "./PersonalData";
import LaboralExperienceForm from "./LaboralExperienceData";

const steps = ['Datos Personales', 'Educación', 'Experiencia Laboral', 'Aptitudes', 'Certificaciones', 'Logros o Reconocimientos', 'Idiomas'];

// Estilos personalizados para el conector del Stepper
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

// Estilos personalizados para el ícono de los pasos
const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: theme.palette.primary.main,
  }),
  '& .QontoStepIcon-completedIcon': {
    color: theme.palette.primary.main,
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

// Componente personalizado para el ícono de los pasos
function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Paso {activeStep + 1}: {steps[activeStep]}
      </Typography>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Renderizar el formulario según el paso actual */}
      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && <PersonalData />}
        {activeStep === 1 && <div>Formulario de Educación</div>}
        {activeStep === 2 && <LaboralExperienceForm />}
        {activeStep === 3 && <div>Formulario de Aptitudes</div>}
        {activeStep === 4 && <div>Formulario de Certificaciones</div>}
        {activeStep === 5 && <div>Formulario de Logros o Reconocimientos</div>}
        {activeStep === 6 && <div>Formulario de Idiomas</div>}
      </Box>

      {/* Botones de navegación */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button onClick={handleBack} disabled={activeStep === 0} sx={{ mr: 1 }}>
          Atrás
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
        </Button>
      </Box>
    </Container>
  );
};

export default StepperForm;