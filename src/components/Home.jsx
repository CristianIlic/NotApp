import notAppLogo from ".././assets/logonotapp.png";
import { Button, background } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
import { Link } from "@chakra-ui/react";
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

  console.log(user?.email);

  return (
    <div className="home">
      <div className="logo-central">
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
          <img src={notAppLogo} className="logo" alt="NotApp logo" />
        </a>
      </div>
      <p>Para un efectivo monitoreo de tu rendimiento académico</p>

      <Stack direction="row" spacing={10} justify="center">
        <Link href="/login">
          <Button
            leftIcon={<AiOutlineLogin />}
            bg="secondary"
            color="white"
            _hover={{
              background: "primary",
            }}
          >
            Iniciar sesión
          </Button>
        </Link>
      </Stack>

      <div className="accordion">
        <Accordion allowToggle>
          <AccordionItem border="none">
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <p>Como funciona?</p>
                </Box>
                <AccordionIcon color="white" />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <p>
                Con esta aplicación tendras la posibilidad de: -Mantener un
                seguimiento de tus notas y de las evaluaciones y tareas que
                debas realizar si eres un alumno. -Modificar, agregar o eliminar
                notas, chatear con apoderados o realizar anuncios para tus
                alumnos como profesor. -Mantener un seguimiento tanto de las
                notas como de los promedios de tu pupilo, además de poder
                chatear con los profesores,por otra parte tendrás la posibilidad
                de mantener un seguimiento de los anuncios que los/las
                profesores/as realicen.
              </p>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem border="none">
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <p>Nosotros</p>
                </Box>
                <AccordionIcon color="white" />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <p>Aplicación realizada por:</p>
              <p>
                {" "}
                -Cristian Ilic, estudiante de 5to semestre Analista Programador
                Computacional Duoc UC
              </p>
              <p>
                {" "}
                -Marcelo Aguilera, estudiante de 5to semestre Analista
                Programador Computacional Duoc UC
              </p>
              <p>
                {" "}
                -Javier Sandoval, estudiante de 5to semestre Analista
                Programador Computacional Duoc UC.
              </p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Home;
