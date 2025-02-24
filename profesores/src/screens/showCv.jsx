import { useState } from "react";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import FormCV from "../components/FormCV";
import WorkExperience from "../components/WorkExperiencie";
import Experience from "../components/Experiencie";
import Certification from "../components/Certification";
import Education from "../components/Education"; 
import Languages from "../components/Languages"; 
import Achievements from "../components/Achievements"; 
import { useParams } from "react-router-dom";

const ShowCV = () => {
  const [view, setView] = useState("form");
  const { id } = useParams();

  console.log("ID recibido en el frontend:", id);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => setView("form")}>
            Datos personales
          </Button>
          <Button color="inherit" onClick={() => setView("aptitudes")}>
            Aptitudes
          </Button>
          <Button color="inherit" onClick={() => setView("certification")}>
            Certificación
          </Button>
          <Button color="inherit" onClick={() => setView("education")}>
            Educación
          </Button>
          <Button color="inherit" onClick={() => setView("experiencie")}>
            Experiencia
          </Button>
          <Button color="inherit" onClick={() => setView("languages")}>
            Idiomas
          </Button>
          <Button color="inherit" onClick={() => setView("achievements")}>
            Logros
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        {view === "form" && (
          <div>
            <FormCV id={id} />
          </div>
        )}
        {view === "aptitudes" && (
          <div>
            <WorkExperience id={id} />
          </div>
        )}
        {view === "certification" && (
          <div>
            <Certification id={id} />
          </div>
        )}
        {view === "education" && (
          <div>
            <Education id={id} />
          </div>
        )}
        {view === "experiencie" && (
          <div>
            <Experience id={id} />
          </div>
        )}
        {view === "languages" && (
          <div>
            <Languages id={id} />
          </div>
        )}
        {view === "achievements" && (
          <div>
            <Achievements id={id} />
          </div>
        )}
      </Container>
    </div>
  );
};

export default ShowCV;
