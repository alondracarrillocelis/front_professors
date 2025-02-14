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
  Grid
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Check from "@mui/icons-material/Check";
import PersonalData from "./PersonalData";
import LaboralExperienceForm from "./LaboralExperienceData";
import AbilitiesForm from "./AbilitiesData"
import LanguageForm from "./LanguagesData"
import CertificationsForm from "./Certifications"
import EducationForm from "./EducationData"
import AchievementsForm from "./AchievementsData"

const steps = [
  "Datos Personales",
  "Educación",
  "Experiencia Laboral",
  "Aptitudes",
  "Certificaciones",
  "Logros o Reconocimientos",
  "Idiomas"
];

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)"
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderLeftWidth: 3,
    borderRadius: 1
  }
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
  display: "flex",
  alignItems: "center",
  ...(ownerState.active && {
    color: theme.palette.primary.main
  }),
  "& .QontoStepIcon-completedIcon": {
    color: theme.palette.primary.main,
    zIndex: 1,
    fontSize: 18
  },
  "& .QontoStepIcon-circle": {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "currentColor"
  }
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
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
   <Container maxWidth="xl" sx={{ mt: 4, p: 4, backgroundColor: "white", borderRadius: 3, boxShadow: 3 }}>
  <Grid container spacing={5}> 
    {/* Columna del Stepper */}
    <Grid item xs={3}> {/* Reducido a 3 para dar más espacio al formulario */}
      <Stepper activeStep={activeStep} orientation="vertical" connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Grid>

    {/* Columna del formulario */}
    <Grid item xs={9}> {/* Más ancho para el formulario */}
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        {steps[activeStep]}
      </Typography>

      <Box>
        {activeStep === 0 && <PersonalData />}
        {activeStep === 1 && <EducationForm/>}
        {activeStep === 2 && <LaboralExperienceForm />}
        {activeStep === 3 && <AbilitiesForm/>}
        {activeStep === 4 && <CertificationsForm/>}
        {activeStep === 5 && <AchievementsForm/>}
        {activeStep === 6 && <LanguageForm/>}
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button onClick={handleBack} disabled={activeStep === 0}>
          Atrás
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </Box>
    </Grid>
  </Grid>
</Container>

  );
};

export default StepperForm;
