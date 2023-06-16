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
  Checkbox,
  CheckboxGroup,
  Stack,
} from "@chakra-ui/react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  collection,
  collectionGroup,
} from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from "reactfire";

import { ArrowBackIcon } from "@chakra-ui/icons";
import { auth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "chakra-multiselect";

//Cada vez que haya un cambio en la info que trae firebase, se almacene la info anterior y se actualice el useState
const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
    control,
  } = useForm();

  const [asignatura, setAsignatura] = useState([]);

  const idCurso = watch("profesorDe");
  const [selectedCurso, setSelectedCurso] = useState("1-EMA-23");

  const cursosRef = collection(useFirestore(), "curso");

  const { data: cursos } = useFirestoreCollectionData(cursosRef);

  // const asignaturasRef = collectionGroup(useFirestore(), "asignaturas");
  const asignaturasCursoRef = collection(
    useFirestore(),
    "curso",
    selectedCurso,
    "asignaturas"
  );
  const { data: asignaturas } = useFirestoreCollectionData(asignaturasCursoRef);

  console.log("asignatura", asignatura);

  useEffect(() => {
    if (asignaturas?.length > 0) {
      const asignaturaFormateada = asignaturas.map(
        ({ NO_ID_FIELD: idAsignatura, nombre }) => {
          return { label: nombre, value: nombre };
        }
      );

      setAsignatura((prevAsignaturas) => [
        ...prevAsignaturas,
        asignaturaFormateada,
      ]);
    }
  }, [asignaturas]);

  const navigate = useNavigate();
  const db = getFirestore();
  const [secondStep, setSecondStep] = useState(false);
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "profesorDe", // unique name for your Field Array
    }
  );

  async function onSubmit(data) {
    const { apellidos, contrasena, email, genero, nombres, rut, profesorDe } =
      data;

    const curso = {};

    profesorDe.forEach(({ curso: idCurso, asignatura }) => {
      curso[idCurso] = asignatura;
    });

    const formattedData = {
      apellidos,
      contrasena,
      email,
      genero,
      nombres,
      rut,
      curso,
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
        await setDoc(doc(db, "profesores", uid), {
          nombres: formattedData.nombres,
          apellidos: formattedData.apellidos,
          rut: formattedData.rut,
          genero: formattedData.genero,
          curso: formattedData.curso,
        });
        setSecondStep(true);

        alert("NotApp: Profesor creado exitosamente");
        navigate("/profesor");
      } else {
        alert("NotApp: Creación de profesor fallida");
      }
    } catch (error) {
      console.log(error);
      alert("Creación de usuario fallida");
      alert(error);
    }
  }

  return (
    <div className="form-control">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          size="md"
          onClick={() =>
            secondStep ? setSecondStep(false) : navigate("/admini")
          }
          bg="secondary"
          color="white"
          mb="5px"
          display="flex"
          _hover={{ background: "primary" }}
        >
          <ArrowBackIcon />
        </Button>
        <Text color="black" fontSize="30px">
          Registro Profesor
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
              bg="secondary"
              color="white"
              margin="15px"
              _hover={{
                background: "primary",
              }}
            >
              Siguiente
            </Button>
          </>
        )}
        {secondStep && (
          <>
            <Text display="flex" m="20px auto" color="black" fontSize="18px">
              ¿En qué cursos impartirá clases?
            </Text>

            {fields.map(({ id }, index) => (
              //  <li key={item.id}>
              //  <input {...register(test.${index}.firstName)} />
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
                  name={`profesorDe.${index}.curso`}
                  control={control}
                />

                <Controller
                  render={({ field }) => (
                    <MultiSelect
                      options={asignatura[index]}
                      label="Selecciona asignatura(s)"
                      {...field}
                    />
                  )}
                  name={`profesorDe.${index}.asignatura`}
                  control={control}
                />

                <Button
                  size="sm"
                  bg="secondary"
                  color="white"
                  margin="20px 0 auto"
                  _hover={{
                    background: "primary",
                  }}
                  onClick={() => {
                    remove(index);
                    setAsignatura((prev) => {
                      const newValues = prev.filter((value, indexPrev) => {
                        return index !== indexPrev;
                      });

                      return newValues;
                    });
                  }}
                >
                  Eliminar
                </Button>
              </React.Fragment>
            ))}

            <Button
              onClick={() => append()}
              size="sm"
              bg="secondary"
              color="white"
              margin="20px 0 auto"
              _hover={{
                background: "primary",
              }}
            >
              Agregar
            </Button>

            <Button
              type="submit"
              size="sm"
              bg="secondary"
              color="white"
              margin="20px 0 auto"
              // isLoading={isSubmitting}
              _hover={{
                background: "primary",
              }}
            >
              Finalizar
            </Button>
          </>
        )}
      </form>
    </div>
  );
};

export default SignUp;
