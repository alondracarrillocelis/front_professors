import { useState } from "react";
import { AppBar, Toolbar, Button, Container, Typography } from "@mui/material";
import FormCV from "../components/FormCV";
import WorkExperience from "../components/WorkExperiencie";

const ShowCV = () => {
  const [view, setView] = useState("form");

  return (
    <div>
      <Container>
        <Typography variant="h4" gutterBottom>
          Curriculum Vitae
        </Typography>
      </Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => setView("form")}>
            Datos personales
          </Button>
          <Button color="inherit" onClick={() => setView("otherCV")}>
            Experiencia Laboral
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        {view === "form" ? (
          <div>
            <FormCV />
          </div>
        ) : (
          <div>
            <WorkExperience />
          </div>
        )}
      </Container>
    </div>
  );
};

export default ShowCV;
