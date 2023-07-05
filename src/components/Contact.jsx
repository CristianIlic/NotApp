import React, { useRef, useState, useEffect } from "react";
import {
  FormControl,
  Input,
  Textarea,
  Button,
  Text,
  Select,
} from "@chakra-ui/react";
import emailjs from "@emailjs/browser";
import { useForm, Controller } from "react-hook-form";
import {
  useFirestore,
  useFirestoreDocData,
  useAuth,
  useFirestoreCollectionData,
} from "reactfire";
import {
  doc,
  collection,
  query,
  where,
  getFirestore,
  getDocs,
} from "firebase/firestore";
import useNotifications from "../hooks/useNotifications";

const Contact = () => {
  const form = useRef();
  const [selectedCurso, setSelectedCurso] = useState("");
  const [selectedProfesor, setSelectedProfesor] = useState(
    "tEDStjHWDTWeB5fohypcTYqeDUd2"
  );
  const { sendNotification } = useNotifications();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const { currentUser } = useAuth();
  const firestore = useFirestore();

  //profesor o apoderado
  const ref = doc(firestore, "usuario", currentUser?.uid);
  const { status: statusProfesor, data: profesor } = useFirestoreDocData(ref);

  const profeRef = doc(firestore, "usuario", selectedProfesor);
  const { data: profeSeleccionado } = useFirestoreDocData(profeRef);

  //alumnos
  const alumnosCollection = collection(firestore, "usuario");
  const alumnosQuery = query(
    alumnosCollection,
    where("idCurso", "==", selectedCurso)
  );

  const profesoresQuery = query(
    alumnosCollection,
    where("rol", "==", "profesor")
  );

  const { data: alumnos } = useFirestoreCollectionData(alumnosQuery);
  const { status: statusProfesores, data: profesores } =
    useFirestoreCollectionData(profesoresQuery);
  const alumnosApoderado = profesor?.alumnos;

  const idCurso = alumnosApoderado?.map((uid) => {
    const docRef = doc(firestore, "usuario", uid);
    const { data } = useFirestoreDocData(docRef);

    if (data) {
      // Aquí puedes trabajar con los datos del documento
      return data.idCurso;
    } else {
      console.log("El UID", uid, "no existe en la colección.");
    }
  });
  const resultados = [];

  const sendEmail = async ({ asunto, mensaje, alumno }) => {
    if (profesor.rol === "apoderado") {
      sendNotification({
        contenido: `El ${profesor?.rol} ${profesor?.nombres} ${profesor?.apellidos} te ha enviado un mensaje`,
        sendTo: doc.id,
      });
      emailjs
        .send(
          "service_dkgm1nw",
          "template_rtaeubj",
          {
            correo: profeSeleccionado.correo,
            correoEnviador: profesor.correo,
            asunto,
            mensaje,
            enviadoA: `${profeSeleccionado.nombres} ${profeSeleccionado.apellidos}`,
            enviadoPor: `${profesor?.nombres} ${profesor?.apellidos}`,
          },
          "Yi2Sz8BpNYNP4mEzw"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          },
          reset()
        );
    } else if (profesor.rol === "profesor") {
      const db = getFirestore();

      const usersQuery = query(
        collection(db, "usuario"),
        where("alumnos", "array-contains", alumno)
      );
      const apoderados = await getDocs(usersQuery);

      apoderados.forEach((doc) => {
        const { nombres, apellidos, correo } = doc.data();
        sendNotification({
          contenido: `El ${profesor?.rol} ${profesor?.nombres} ${profesor?.apellidos} te ha enviado un mensaje`,
          sendTo: doc.id,
        });
        emailjs
          .send(
            "service_dkgm1nw",
            "template_kbtl55e",
            {
              correo,
              correoEnviador: profesor.correo,
              asunto,
              mensaje,
              enviadoA: `${nombres} ${apellidos}`,
              enviadoPor: `${profesor?.nombres} ${profesor?.apellidos}`,
            },
            "Yi2Sz8BpNYNP4mEzw"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            },
            reset()
          );
      });
    }
  };

  if (statusProfesores === "success" && idCurso) {
    for (const obj of profesores) {
      for (const curso of idCurso) {
        if (obj.curso && obj.curso[curso]) {
          resultados.push({
            nombres: `${obj.nombres} ${obj.apellidos}`,
            correo: `${obj.correo}`,
            NO_ID_FIELD: `${obj.NO_ID_FIELD}`,
          });
          break; // Salir del bucle interior si se encuentra una coincidencia
        }
      }
    }
  }

  if (statusProfesor === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <div className="form-control">
      <Text color="black" fontSize="30px">
        Contáctanos
      </Text>
      <form
        onSubmit={handleSubmit(sendEmail)}
        ref={form}
        className="--form-control --card"
      >
        <FormControl>
          {profesor.rol === "apoderado" ? (
            <Controller
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  mb="1vh"
                  type="text"
                  placeholder="Seleccione profesor"
                  onChange={(e) => {
                    setSelectedProfesor(e.target.value);
                    onChange(e);
                  }}
                  {...rest}
                >
                  {resultados.map(({ nombres, NO_ID_FIELD }) => (
                    <option value={NO_ID_FIELD}>{nombres}</option>
                  ))}
                </Select>
              )}
              name={`profe`}
              control={control}
            />
          ) : (
            <>
              <Controller
                render={({ field: { onChange, ...rest } }) => (
                  <Select
                    mb="1vh"
                    type="text"
                    placeholder="Seleccione curso"
                    onChange={(e) => {
                      setSelectedCurso(e.target.value);
                      onChange(e);
                    }}
                    {...rest}
                  >
                    {Object.getOwnPropertyNames(profesor?.curso).map(
                      (curso) => (
                        <option value={curso}>{curso}</option>
                      )
                    )}
                  </Select>
                )}
                name={`curso`}
                control={control}
              />
              <Select
                mb="1vh"
                type="text"
                placeholder="Seleccione alumno"
                disabled={!selectedCurso}
                {...register("alumno")}
              >
                {alumnos?.map(({ NO_ID_FIELD, nombres, apellidos }) => (
                  <option
                    value={NO_ID_FIELD}
                  >{`${nombres} ${apellidos}`}</option>
                ))}
              </Select>
            </>
          )}

          <Input
            mb="1vh"
            type="text"
            placeholder="Asunto"
            name="asunto"
            {...register("asunto")}
          />

          <Textarea
            {...register("mensaje")}
            name="mensaje"
            mb="1vh"
            cols="30"
            rows="10"
          ></Textarea>
          <Button
            bg="primary"
            color="white"
            margin="15px"
            _hover={{
              background: "primaryHover",
            }}
            type="submit"
          >
            Enviar mensaje
          </Button>
        </FormControl>
      </form>
    </div>
  );
};
export default Contact;
