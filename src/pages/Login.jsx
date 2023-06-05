import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext, auth } from "../AuthContext";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
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
        navigate("/");

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
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading color="white" fontSize={"4xl"}>
          Inicia sesión ✌
        </Heading>
      </Stack>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Correo electrónico</FormLabel>
            <Input type="email" className="email" />
          </FormControl>
          <FormControl id="contrasena">
            <FormLabel>Contraseña</FormLabel>
            <Input type="password" className="contrasena" />
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
              bg={"secondary"}
              color={"white"}
              isLoading={isSubmitting}
              _hover={{
                bg: "primary",
              }}
            >
              Entrar
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Login;
