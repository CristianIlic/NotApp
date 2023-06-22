import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext, auth } from "../AuthContext";
import {
  setPersistence,
  sendPasswordResetEmail,
  updateProfile,
  browserSessionPersistence,
  browserLocalPersistence,
} from "firebase/auth";
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
import { ArrowBackIcon } from "@chakra-ui/icons";

const RecoverPassword = () => {
  const {
    handleSubmit,
    control,
    register,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm();
  const [checked, setChecked] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const submitHandler = async () => {
    try {
      await sendPasswordResetEmail(
        auth,
        document.querySelector(".email").value
      );
      toast({
        title: "Correo enviado",
        description:
          "Si el correo está en nuestra base de datos, recibirás la wea",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "No se pudo enviar el correo de recuperación",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const currentUser = useContext(AuthContext);

  useEffect(() => {
    if (checked) {
      setPersistence(auth, browserLocalPersistence);
    } else {
      setPersistence(auth, browserSessionPersistence);
    }
  }, [checked]);

  if (currentUser) {
    return <Navigate to="/" />;
  }
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading color="black" fontSize={"4xl"}>
          Recuperación contraseña
        </Heading>
      </Stack>

      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Link to="/login">
          <Button
            size="md"
            bg="primary"
            color="white"
            mb="5px"
            display="flex"
            _hover={{ background: "primaryHover" }}
          >
            <ArrowBackIcon />
          </Button>
        </Link>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Correo electrónico:</FormLabel>
            <Input type="email" className="email" />
          </FormControl>

          <Button
            onClick={() => submitHandler()}
            bg={"primary"}
            color={"white"}
            isLoading={isSubmitting}
            _hover={{
              bg: "primaryHover",
            }}
          >
            Entrar
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default RecoverPassword;
