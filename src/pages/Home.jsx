// import notAppLogo from ".././assets/logonotapp.png";
// import { Button, background } from "@chakra-ui/react";
// import { Stack } from "@chakra-ui/react";
// import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import ".././styles/index.css";

// import { useUser, useAuth } from "reactfire";
// import { useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { getAuth } from "firebase/auth";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Box,
// } from "@chakra-ui/react";

// const Home = () => {
//   const auth = getAuth();
//   const [user, setUser] = useState({});

//   onAuthStateChanged(auth, (currentUser) => {
//     setUser(currentUser);
//   });

//   return()

//   // return (
//   //   <div className="home">
//   //     <div className="logo-central">
//   //       <img src={notAppLogo} className="logo" alt="NotApp logo" />
//   //     </div>
//   //     <p>Para un efectivo monitoreo de tu rendimiento académico</p>

//   //     <Stack direction="row" spacing={10} justify="center">
//   //       {!user && (
//   //         <Link to="/login">
//   //           <Button
//   //             leftIcon={<AiOutlineLogin />}
//   //             bg="secondary"
//   //             color="white"
//   //             _hover={{
//   //               background: "primary",
//   //             }}
//   //           >
//   //             Iniciar sesión
//   //           </Button>
//   //         </Link>
//   //       )}
//   //     </Stack>

//   //     <div className="accordion">
//   //       <Accordion allowToggle>
//   //         <AccordionItem border="none">
//   //           <AccordionButton>
//   //             <Box as="span" flex="1" textAlign="left">
//   //               <p>Como funciona?</p>
//   //             </Box>
//   //             <AccordionIcon color="white" />
//   //           </AccordionButton>
//   //           <AccordionPanel pb={4}>
//   //             <p>
//   //               Con esta aplicación tendrás la posibilidad de: <br />
//   //               <br />
//   //               -Mantener un seguimiento de tus notas y de las evaluaciones y
//   //               tareas que debas realizar si eres un alumno. <br />
//   //               <br />
//   //               -Agregar y modificar notas o realizar anuncios para los
//   //               apoderados como profesor. <br />
//   //               <br />
//   //               -Mantener un seguimiento de los anuncios que los/las
//   //               profesores/as realicen.
//   //             </p>
//   //           </AccordionPanel>
//   //         </AccordionItem>

//   //         <AccordionItem border="none">
//   //           <AccordionButton>
//   //             <Box as="span" flex="1" textAlign="left">
//   //               <p>Nosotros</p>
//   //             </Box>
//   //             <AccordionIcon color="white" />
//   //           </AccordionButton>
//   //           <AccordionPanel pb={4}>
//   //             <p>Aplicación realizada por:</p>
//   //             <p>
//   //               {" "}
//   //               -Cristián Ilic
//   //               <br /> -Marcelo Aguilera
//   //               <br /> -Javier Sandoval <br />
//   //               <br /> Estudiantes de 5to semestre Analista Programador
//   //               Computacional Duoc UC
//   //             </p>
//   //           </AccordionPanel>
//   //         </AccordionItem>
//   //       </Accordion>
//   //     </div>
//   //   </div>
//   // );
// };

// export default Home;

import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import Homenavbar from "../components/HomeNavbar";
import HomeFeatures from "../components/HomeFeatures";

export default function WithBackgroundImage() {
  return (
    <>
      <Homenavbar />
      <Flex
        w={"full"}
        h={"91vh"}
        backgroundImage={
          "url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          align={"flex-start"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            <Text
              color={"white"}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: "6xl", md: "5xl" })}
            >
              Para un efectivo monitoreo de tu rendimiento académico
            </Text>
            <Stack direction={"row"}>
              <Button
                bg={"blue.400"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
              >
                Iniciar Sesión
              </Button>
              <Button
                bg={"whiteAlpha.300"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "whiteAlpha.500" }}
              >
                ¿Cómo funciona?
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <HomeFeatures />
    </>
  );
}
