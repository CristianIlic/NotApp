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
  Text,
  useToast,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  doc,
  setDoc,
  addDoc,
  getFirestore,
  collection,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { auth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const db = getFirestore();
  const cursosRef = collection(useFirestore(), "curso");
  const { status, data: cursos } = useFirestoreCollectionData(cursosRef);
  const materias = {
    Matemáticas: {
      notas: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    },
    "Lenguaje y Comunicaciones": {
      notas: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    },
    Química: {
      notas: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    },
    Física: {
      notas: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    },
    Historia: {
      notas: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    },
  };
  console.log("cursos", cursos);

  async function onSubmit(data) {
    console.log(data);
    try {
      if (data) {
        await addDoc(collection(db, "alumnos"), {
          nombres: data.nombres,
          apellidos: data.apellidos,
          rut: data.rut,
          curso: data.curso,
          materias,
        });

        navigate("/admini");

        toast({
          title: "Registro exitoso",
          description: "Alumno creado satisfactoriamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        alert("NotApp: Creación de Alumno fallida");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar alumno",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("ERROR:", error);
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
    <Navbar>
      <div className="form-control">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Link to="/admini">
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
          <Text color="black" fontSize="30px">
            Registro Alumno
          </Text>

          <FormControl isInvalid={errors.nombres}>
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
          <FormControl isInvalid={errors.curso}>
            <FormLabel fontWeight="bold">Curso</FormLabel>
            <Select
              m="20px auto"
              placeholder="Seleccione un curso"
              {...register("curso")}
            >
              {cursos?.map(({ NO_ID_FIELD: id, nombre }) => {
                return (
                  <option key={id} value={id}>
                    {nombre}
                  </option>
                );
              })}
            </Select>

            <FormErrorMessage>
              {errors.curso && errors.curso.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            size="sm"
            bg="primary"
            color="white"
            margin="15px"
            isLoading={isSubmitting}
            _hover={{
              background: "primaryHover",
            }}
          >
            Registrar
          </Button>
        </form>
      </div>
    </Navbar>
  );
};

export default SignUp;
