import { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Container,
  Typography,
  StepConnector,
  stepConnectorClasses,
  Box,
  Grid,
  Paper
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Check, Person, School, Work, Star, Verified, EmojiEvents, Language } from "@mui/icons-material";
import PersonalData from "./PersonalData";
import LaboralExperienceForm from "./LaboralExperienceData";
import AbilitiesForm from "./AbilitiesData";
import LanguageForm from "./LanguagesData";
import CertificationsForm from "./Certifications";
import EducationForm from "./EducationData";
import AchievementsForm from "./AchievementsData";

// Definir pasos con íconos
const steps = [
  { label: "Datos Personales", icon: <Person /> },
  { label: "Educación", icon: <School /> },
  { label: "Experiencia Laboral", icon: <Work /> },
  { label: "Aptitudes", icon: <Star /> },
  { label: "Certificaciones", icon: <Verified /> },
  { label: "Logros", icon: <EmojiEvents /> },
  { label: "Idiomas", icon: <Language /> }
];

// Estilos para el conector del Stepper
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#A6D785",
    borderLeftWidth: 3,
    borderRadius: 1
  }
}));

// Estilos para los iconos del Stepper
const StepIconContainer = styled("div")(({ theme, ownerState }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: "50%",
  backgroundColor: ownerState.completed ? "#4CAF50" : "#A6D785",
  color: ownerState.completed ? "white" : "#2E7D32"
}));

// Componente personalizado para los iconos del Stepper
const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;
  return (
    <StepIconContainer ownerState={{ active, completed }}>
      {completed ? <Check fontSize="small" /> : icon}
    </StepIconContainer>
  );
};

const StepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: "20px", padding: "20px", margin: "20px", boxShadow: 3 }}>
      <Container maxWidth="xl" sx={{ backgroundColor: "white", borderRadius: 3 }}>
        <Grid container spacing={5}>
          {/* Columna del Stepper */}
          <Grid item xs={3}>
            <Stepper activeStep={activeStep} orientation="vertical" connector={<QontoConnector />}>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel StepIconComponent={() => <CustomStepIcon completed={activeStep > index} icon={step.icon} />}>
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>

          {/* Columna del formulario */}
          <Grid item xs={9}>
            <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: "bold", color: "#2E7D32" }}>
              {steps[activeStep].label}
            </Typography>

            <Box>
              {activeStep === 0 && <PersonalData />}
              {activeStep === 1 && <EducationForm />}
              {activeStep === 2 && <LaboralExperienceForm />}
              {activeStep === 3 && <AbilitiesForm />}
              {activeStep === 4 && <CertificationsForm />}
              {activeStep === 5 && <AchievementsForm />}
              {activeStep === 6 && <LanguageForm />}
            </Box>

            {/* Botones de navegación */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{
                  bgcolor: "#A6D785",
                  color: "#2E7D32",
                  borderRadius: "20px",
                  "&:hover": { bgcolor: "#8BC34A" }
                }}
              >
                Atrás
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  bgcolor: "#A6D785",
                  color: "#2E7D32",
                  borderRadius: "20px",
                  "&:hover": { bgcolor: "#8BC34A" }
                }}
              >
                {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default StepperForm;
