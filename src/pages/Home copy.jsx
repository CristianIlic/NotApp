import notAppLogo from ".././assets/logonotapp.png";
import { Button, background } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
import { Link } from "react-router-dom";
import ".././styles/index.css";

import { useUser, useAuth } from "reactfire";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const Home = () => {
  const auth = getAuth();
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  return (
    <div className="home">
      <div className="logo-central">
        <img src={notAppLogo} className="logo" alt="NotApp logo" />
      </div>
      <p>Para un efectivo monitoreo de tu rendimiento académico</p>

      <Stack direction="row" spacing={10} justify="center">
        {!user && (
          <Link to="/login">
            <Button
              leftIcon={<AiOutlineLogin />}
              bg="primary"
              color="white"
              _hover={{
                background: "primaryHover",
              }}
            >
              Iniciar sesión
            </Button>
          </Link>
        )}
      </Stack>

      <div className="accordion">
        <Accordion allowToggle>
          <AccordionItem border="none">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <p>Como funciona?</p>
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <p>
                Con esta aplicación tendrás la posibilidad de: <br />
                <br />
                -Mantener un seguimiento de tus notas y de las evaluaciones y
                tareas que debas realizar si eres un alumno. <br />
                <br />
                -Agregar y modificar notas o realizar anuncios para los
                apoderados como profesor. <br />
                <br />
                -Mantener un seguimiento de los anuncios que los/las
                profesores/as realicen.
              </p>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="none">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <p>Nosotros</p>
              </Box>
              <AccordionIcon color="white" />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <p>Aplicación realizada por:</p>
              <p>
                {" "}
                -Cristián Ilic
                <br /> -Marcelo Aguilera
                <br /> -Javier Sandoval <br />
                <br /> Estudiantes de 5to semestre Analista Programador
                Computacional Duoc UC
              </p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Home;
