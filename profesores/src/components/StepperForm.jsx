import { useState } from "react";
import { Stepper, Step, StepLabel, Button, Container } from "@mui/material";
import PersonalData from "./PersonalData";
import LaboralExperienceForm from "./LaboralExperienceData";
const steps = ['Datos Personales', 'Datos de Contacto', 'Confirmación'];

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
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Renderizar el formulario en el primer paso */}
      {activeStep === 0 && <PersonalData />}

      {/* Aquí puedes agregar más pasos del stepper */}
      {activeStep === 1 &&  <LaboralExperienceForm /> }
      {activeStep === 2 && <PersonalData />}

      {/* Botones de navegación */}
      <Button onClick={handleBack} disabled={activeStep === 0}>
        Atrás
      </Button>
      <Button variant="contained" color="primary" onClick={handleNext}>
        {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
      </Button>
    </Container>
  );
};

export default StepperForm;