import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Button,
  RadioGroup,
  Radio,
  HStack,
} from "@chakra-ui/react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

import { HiOutlineUser } from "react-icons/hi";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const navigate = useNavigate();

  async function onSubmit(data) {
    console.log(data);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.contrasena
      );

      if (result.user) {
        await updateProfile(result.user, { displayName: data.nombres });

        navigate("/");

        alert("NotApp: Usuario creado exitosamente");
      } else {
        alert("NotApp: Creación de usuario fallida");
      }
    } catch (error) {
      console.log(error);
      alert("Creación de usuario fallida");
      alert(error);
    }
  }

  // function onSubmit(values) {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       alert(JSON.stringify(values, null, 2));
  //       resolve();
  //     }, 3000);
  //   });
  // }

  return (
    <div className="form-control">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.nombres}>
          <HiOutlineUser size="50px" />
          <FormLabel fontWeight="bold">Nombres</FormLabel>
          <Input
            borderWidth="3px"
            type="text"
            {...register("nombres", {
              required: "* Campo obligatorio",
              minLength: { value: 2, message: "* Mínimo 2 caracteres" },
              maxLength: { value: 30, message: "* Máximo 30 caracteres" },
            })}
          />
          <FormErrorMessage>
            {errors.nombres && errors.nombres.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.apellidos}>
          <FormLabel fontWeight="bold">Apellidos</FormLabel>
          <Input
            borderWidth="3px"
            type="text"
            {...register("apellidos", {
              required: "* Campo obligatorio",
              minLength: { value: 3, message: "* Mínimo 3 caracteres" },
              maxLength: 30,
            })}
          />
          <FormErrorMessage>
            {errors.apellidos && errors.apellidos.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.rut}>
          <FormLabel fontWeight="bold">RUT</FormLabel>
          <Input
            borderWidth="3px"
            type="text"
            placeholder="Sin puntos y con guión"
            {...register("rut", {
              required: "* Campo obligatorio",
              maxLength: 12,
              pattern: {
                value: /^[0-9]+[-|‐]{1}[0-9kK]{1}$/,
                message: "RUT inválido",
              },
            })}
          />
          <FormErrorMessage>
            {errors.rut && errors.rut.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Género</FormLabel>
          <RadioGroup defaultValue="Hombre">
            <HStack spacing="20px">
              <Radio value="Hombre">Hombre</Radio>
              <Radio value="Mujer">Mujer</Radio>
              <Radio value="Otro">Otro</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <FormLabel fontWeight="bold">Correo electrónico</FormLabel>
          <Input
            borderWidth="3px"
            type="email"
            {...register("email", {
              required: "* Campo obligatorio",
              pattern: { value: /^\S+@\S+$/i, message: "* Correo inválido" },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.contrasena}>
          <FormLabel fontWeight="bold">Contraseña</FormLabel>
          <Input
            borderWidth="3px"
            type="password"
            {...register("contrasena", {
              required: "Debe contener entre 8 y 12 caracteres",
              maxLength: {
                value: 12,
                message: "Debe contener entre 8 y 12 caracteres",
              },
              minLength: {
                value: 8,
                message: "Debe contener entre 8 y 12 caracteres",
              },
            })}
          />
          <FormErrorMessage>
            {errors.contrasena && errors.contrasena.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmaContrasena}>
          <FormLabel>Repite tu contraseña</FormLabel>
          <Input
            borderWidth="3px"
            type="password"
            {...register("confirmaContrasena", {
              validate: (value) =>
                value === watch("contrasena", "") ||
                "Las contraseñas no coinciden",
            })}
          />
          <FormErrorMessage>
            {errors.confirmaContrasena && errors.confirmaContrasena.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Tipo de usuario</FormLabel>
          <Select {...register("tipo_usuario")} borderWidth="3px">
            <option value="Profesor">Profesor</option>
            <option value="Apoderado">Apoderado</option>
          </Select>
        </FormControl>

        <Button
          type="submit"
          size="sm"
          bg="secondary"
          color="white"
          margin="15px"
          isLoading={isSubmitting}
          _hover={{
            background: "primary",
          }}
        >
          Registrarse
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
