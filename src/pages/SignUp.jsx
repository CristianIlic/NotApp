import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Button,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";

import { Form } from "react-router-dom";

import { HiOutlineUser } from "react-icons/hi";

import { useFirebaseApp } from "reactfire";
import { useForm } from "react-hook-form";

import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <div className="form-control">
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <HiOutlineUser size="50px" />
        <FormLabel fontWeight="bold">Nombres</FormLabel>
        <Input
          borderWidth="3px"
          type="text"
          {...register("Nombres", { required: true, maxLength: 80 })}
        />

        <FormLabel fontWeight="bold">Apellidos</FormLabel>
        <Input
          borderWidth="3px"
          type="text"
          {...register("Apellidos", { required: true, maxLength: 100 })}
        />

        <FormLabel fontWeight="bold">RUT</FormLabel>
        <Input
          borderWidth="3px"
          type="text"
          {...register("RUT", {
            required: true,
            maxLength: 12,
            pattern: /^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/i,
          })}
        />

        <FormLabel fontWeight="bold">Género</FormLabel>
        <RadioGroup defaultValue="Hombre">
          <HStack spacing="20px">
            <Radio value="Hombre">Hombre</Radio>
            <Radio value="Mujer">Mujer</Radio>
            <Radio value="Otro">Otro</Radio>
          </HStack>
        </RadioGroup>

        <FormLabel fontWeight="bold">Correo electrónico</FormLabel>
        <Input
          borderWidth="3px"
          type="text"
          {...register("Correo electrónico", { required: true, pattern: /^\S+@\S+$/i })}
        />

        <FormLabel fontWeight="bold">Contraseña</FormLabel>
        <Input
          borderWidth="3px"
          type="password"
          {...register("Contraseña", { max: 12, min: 7 })}
        />

        <FormLabel>Repite tu contraseña</FormLabel>
        <Input borderWidth="3px" type="password" />

        <FormLabel fontWeight="bold">Tipo de usuario</FormLabel>
        <Select
          {...register("Tipo de usuario")}
          borderWidth="3px"
        >
          <option value="Alumno">Alumno</option>
          <option value="Profesor">Profesor</option>
          <option value="Apoderado">Apoderado</option>
        </Select>

        <Button
          type="submit"
          size="sm"
          bg="secondary"
          color="white"
          margin="15px"
          _hover={{
            background: "27E1C1"
          }}
        >
          Registrarse
        </Button>
      </FormControl>
    </div>
  );
};

export default SignUp;
