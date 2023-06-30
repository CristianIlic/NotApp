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
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Spinner,
} from "@chakra-ui/react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { auth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { MultiSelect } from "chakra-multiselect";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    trigger,
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const db = getFirestore();
  const [secondStep, setSecondStep] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState("");
  const [alumnosList, setAlumnosList] = useState([]);

  //REFERENCIAS A COLECCIONES
  const alumnosRef = collection(useFirestore(), "usuario");
  const filteredAlumnosRef = query(alumnosRef, where("rol", "==", "alumno"));
  const orderedAlumnosRef = query(
    filteredAlumnosRef,
    orderBy("apellidos"),
    where("idCurso", "==", selectedCurso)
  );

  const { status: statusAlumnos, data: alumnos } =
    useFirestoreCollectionData(orderedAlumnosRef);

  const cursosRef = collection(useFirestore(), "curso");
  const { status: statusCursos, data: cursos } =
    useFirestoreCollectionData(cursosRef);

  useEffect(() => {
    if (alumnos?.length > 0) {
      const alumnosFormateados = alumnos.map(
        ({ NO_ID_FIELD: id, nombres, apellidos }) => {
          return { label: id, value: `${nombres} ${apellidos}` };
        }
      );

      setAlumnosList((prev) => [...prev, alumnosFormateados]);
    }
  }, [alumnos]);

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "apoderadoDe", // unique name for your Field Array
    }
  );

  async function onSubmit(data) {
    const { apellidos, contrasena, email, genero, nombres, rut } = data;

    const alumnos = alumnosList
      .flatMap((list) => list)
      .map(({ label }) => label);

    const formattedData = {
      apellidos,
      contrasena,
      email,
      genero,
      nombres,
      rut,
      alumnos,
    };

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        formattedData.email,
        formattedData.contrasena
      );

      if (result.user) {
        const uid = result.user.uid;
        await updateProfile(result.user, { displayName: data.nombres });

        await setDoc(doc(db, "usuario", uid), {
          nombres: formattedData.nombres,
          apellidos: formattedData.apellidos,
          rut: formattedData.rut,
          genero: formattedData.genero,
          alumnos: formattedData.alumnos,
          rol: "apoderado",
        });

        setSecondStep(true);

        toast({
          title: "Registro exitoso",
          description: "Apoderado creado satisfactoriamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        alert("NotApp: Creación de apoderado fallida");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo registrar apoderado",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("ERROR: ", error);
    }
  }

  if (statusCursos === "loading" && statusAlumnos === "loading") {
    return <Spinner color="primary" />;
  }

  return (
    <div className="form-control-apo">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          size="md"
          onClick={() =>
            secondStep ? setSecondStep(false) : navigate("/admini")
          }
          bg="primary"
          color="white"
          mb="5px"
          display="flex"
          _hover={{ background: "primaryHover" }}
        >
          <ArrowBackIcon />
        </Button>
        <Text color="black" fontSize="30px">
          Registro Apoderado
        </Text>
        {!secondStep && (
          <>
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
            <FormControl>
              <FormLabel fontWeight="bold">Género</FormLabel>
              <RadioGroup defaultValue="Hombre">
                <HStack spacing="20px">
                  <Radio name="genero" value="Hombre" {...register("genero")}>
                    Hombre
                  </Radio>
                  <Radio name="genero" value="Mujer" {...register("genero")}>
                    Mujer
                  </Radio>
                  <Radio name="genero" value="Otro" {...register("genero")}>
                    Otro
                  </Radio>
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
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "* Correo inválido",
                  },
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
            <Button
              onClick={async () => {
                const result = await trigger([
                  "nombres",
                  "apellidos",
                  "rut",
                  "genero",
                  "email",
                  "contrasena",
                  "confirmaContrasena",
                ]);
                if (result && setSecondStep(true));
              }}
              size="sm"
              bg="primary"
              color="white"
              margin="15px"
              _hover={{
                background: "primaryHover",
              }}
            >
              Siguiente
            </Button>
          </>
        )}

        {secondStep && (
          <>
            <Flex flexDirection={"column"}>
              <Text display="flex" m="20px auto" color="black" fontSize="18px">
                Alumnos asociados al apoderado/a:
              </Text>
              {fields.map(({ id }, index) => (
                <React.Fragment key={id}>
                  <Controller
                    render={({ field: { onChange, ...rest } }) => (
                      <Select
                        onChange={(event) => {
                          onChange(event.target.value);
                          setSelectedCurso(event.target.value);
                        }}
                        m="20px auto"
                        placeholder="Seleccione un curso"
                        {...rest}
                      >
                        {cursos.map(({ NO_ID_FIELD: idCurso, nombre }) => {
                          return (
                            <option key={idCurso} value={idCurso}>
                              {nombre}
                            </option>
                          );
                        })}
                      </Select>
                    )}
                    name={`apoderadoDe.${index}.curso`}
                    control={control}
                  />
                  <Controller
                    render={({ field }) => (
                      <MultiSelect
                        options={alumnosList[index]}
                        label="Selecciona alumno(s)"
                        {...field}
                      />
                    )}
                    name={`apoderadoDe.${index}.alumnos`}
                    control={control}
                  />
                </React.Fragment>
              ))}
            </Flex>
            <Button
              onClick={() => append()}
              size="sm"
              bg="primary"
              color="white"
              margin="20px 20px"
              _hover={{
                background: "primaryHover",
              }}
            >
              Agregar
            </Button>

            <Button
              type="submit"
              size="sm"
              bg="primary"
              color="white"
              margin="20px 20px"
              // isLoading={isSubmitting}
              _hover={{
                background: "primaryHover",
              }}
            >
              Registrarse
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUp;
