import notAppLogo from ".././assets/logonotapp.png";
import { Button, background } from "@chakra-ui/react";
import { Stack } from "@chakra-ui/react";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
import { Link } from "@chakra-ui/react";
import ".././styles/index.css";


import { useUser,useAuth } from 'reactfire'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const Home = () => {
  const title = "NotApp";

  const caca = useAuth()

  console.log('flanweko',caca.currentUser)

  return (
    <div className="home">
      <div>
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
        >
          <img src={notAppLogo} className="logo" alt="NotApp logo" />
        </a>
      </div>
      <h1>{title}</h1>
      <p>Para un efectivo monitoreo de tu rendimiento académico</p>

      <Stack direction="row" spacing={10} justify="center">
        <Link href="/signup">
          <Button
            leftIcon={<AiOutlineLogin />}
            size="sm"
            bg="secondary"
            color="white"
            _hover={{
              background: "primary"
            }}
          >
            Registrarse
          </Button>
        </Link>
        <Link href="/login">
          <Button
            leftIcon={<AiOutlineLogin />}
            size="sm"
            bg="secondary"
            color="white"
            _hover={{
              background: "primary"
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Home;
