import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import firebaseConfig from "../firebase-config.js";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { useForm, Controller } from 'react-hook-form';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage
} from "@chakra-ui/react";

const Login = () => {

  const {
   handleSubmit,
   control,
   register,
   trigger,
   formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, contrasena }) => {
        try {
          await signInWithEmailAndPassword(email, contrasena);
      } catch (error) {
        alert(error);
      }
    };

    const currentUser = useContext(AuthContext);

    if (currentUser) {
      return <Navigate to="/" />;
    }
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Inicia sesión</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Correo electrónico</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Contraseña</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Recordarme</Checkbox>
                  <Link color={'blue.400'}>Olvidaste tu contraseña?</Link>
                </Stack>
                <Button
                  bg={'secondary'}
                  color={'white'}
                  _hover={{
                    bg: 'primary',
                  }}>
                  Entrar
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

export default Login