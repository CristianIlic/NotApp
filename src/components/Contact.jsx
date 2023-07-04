import React, { useRef, useState } from "react";
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
  const { sendNotification } = useNotifications();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const { currentUser } = useAuth();
  const firestore = useFirestore();

  //profesor o apoderado
  const ref = doc(firestore, "usuario", currentUser?.uid);

  const { status: statusProfesor, data: profesor } = useFirestoreDocData(ref);

  //alumnos
  const alumnosCollection = collection(firestore, "usuario");
  const alumnosQuery = query(
    alumnosCollection,
    where("idCurso", "==", selectedCurso)
  );

  const { data: alumnos } = useFirestoreCollectionData(alumnosQuery);

  const sendEmail = async ({ asunto, mensaje, alumno }) => {
    const db = getFirestore();

    const usersQuery = query(
      collection(db, "usuario"),
      where("alumnos", "array-contains", alumno)
    );

    const apoderados = await getDocs(usersQuery);

    apoderados.forEach((doc) => {
      const { nombres, apellidos, correo } = doc.data();
      sendNotification({
        contenido: `El profesor ${profesor?.nombres} ${profesor?.apellidos} te ha enviado un mensaje`,
        sendTo: doc.id,
      });

      emailjs
        .send(
          "service_dkgm1nw",
          "template_rtaeubj",
          {
            correo,
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
          }
        );
    });
  };

  if (statusProfesor === "loading") {
    return <div>Cargando...</div>;
  }

  console.log("profesor", profesor);

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
          <Controller
            render={({ field: { onChange, ...rest } }) => (
              <Select
                mb="1vh"
                type="text"
                placeholder="Seleccione curso"
                // name="user_name"
                onChange={(e) => {
                  setSelectedCurso(e.target.value);
                  onChange(e);
                }}
                {...rest}
              >
                {Object.getOwnPropertyNames(profesor?.curso).map((curso) => (
                  <option value={curso}>{curso}</option>
                ))}
              </Select>
            )}
            name={`curso`}
            control={control}
          />

          <Select
            mb="1vh"
            type="text"
            placeholder="seleccione alumno"
            disabled={!selectedCurso}
            {...register("alumno")}
          >
            {alumnos?.map(({ NO_ID_FIELD, nombres }) => (
              <option value={NO_ID_FIELD}>{nombres}</option>
            ))}
          </Select>

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
