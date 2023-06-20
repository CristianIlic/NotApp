import notAppLogo from ".././assets/logonotapp.png";
import { AiOutlineUserAdd, AiOutlineLogin } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import ".././styles/index.css";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  HStack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useUser, useAuth } from "reactfire";
import { AuthContext, auth } from "../AuthContext";

import { useState, useContext } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const Home = () => {
  const auth = getAuth();
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  console.log("CACA", user);

  const {
    handleSubmit,
    control,
    register,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        document.querySelector(".email").value,
        document.querySelector(".contrasena").value
      );
      if (result.user) {
        navigate("/profesor");

        toast({
          title: "Sesión iniciada",
          description: "Inició sesión correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        alert("NotApp: No se pudo iniciar sesión");
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Usuario y/o contraseña erroneos",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const currentUser = useContext(AuthContext);

  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="home">
      <span>
        <Text color={"black"}>
          Para una esperiencia de comunicación mejorada
        </Text>
      </span>

      <HStack spacing={"30vmax"} mx={"1vmax"} maxW={"lg"} py={12} px={6}>
        <img src="./nino-libro.png" alt="Niño con libro" />
        <Box
          rounded={"lg"}
          bg={useColorModeValue("lightGreen", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Correo electrónico</FormLabel>
              <Input bg={"white"} type="email" className="email" />
            </FormControl>
            <FormControl id="contrasena">
              <FormLabel>Contraseña</FormLabel>
              <Input bg={"white"} type="password" className="contrasena" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Recordarme</Checkbox>
                <Link color={"blue.400"}>Olvidaste tu contraseña?</Link>
              </Stack>
              <Button
                onClick={() => submitHandler()}
                bg={"#59D2FE"}
                color={"white"}
                isLoading={isSubmitting}
                _hover={{
                  bg: "secondary",
                }}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
        </Box>
      </HStack>
    </div>
  );
};

export default Home;
