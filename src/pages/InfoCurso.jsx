import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  NumberInput,
  Input,
  Button,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import {
  collection,
  orderBy,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { ArrowBackIcon } from "@chakra-ui/icons";

import { useForm } from "react-hook-form";

const InfoCurso = () => {
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const db = getFirestore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [idCurso, idAsignatura] = id.split("@");

  const alumnosRef = collection(useFirestore(), "alumnos");
  const orderedAlumnosRef = query(
    alumnosRef,
    orderBy("apellidos"),
    where("curso", "==", idCurso)
  );

  // subscribe to a document for realtime updates. just one line!
  const {
    status,
    data: alumnos,
    error,
  } = useFirestoreCollectionData(orderedAlumnosRef);
  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  const onSubmit = async (data) => {
    const asignaturaFormat = idAsignatura.replaceAll("_", " ");
    await updateDoc(doc(db, "alumnos", alumnos[0].NO_ID_FIELD), {
      materias: {
        [asignaturaFormat]: {
          notas: Object.values(data),
        },
      },
    });
  };

  return (
    <div>
      <Link to="/profesor">
        <Button
          size="md"
          bg="secondary"
          color="white"
          mb="5px"
          display="flex"
          _hover={{ background: "primary" }}
        >
          <ArrowBackIcon />
        </Button>
      </Link>

      <TableContainer
        as={"form"}
        onSubmit={handleSubmit(onSubmit)}
        bgColor="white"
        borderRadius="8px"
      >
        <Table variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>N°</Th>
              <Th>Alumno</Th>
              <Th>Nota 1</Th>
              <Th>Nota 2</Th>
              <Th>Nota 3</Th>
              <Th>Nota 4</Th>
              <Th>Nota 5</Th>
              <Th>Nota 6</Th>
              <Th>Nota 7</Th>
              <Th>Nota 8</Th>
              <Th>Nota 9</Th>
              <Th>Nota 10</Th>
            </Tr>
          </Thead>
          <Tbody>
            {alumnos.map(
              ({ NO_ID_FIELD, rut, nombres, apellidos, materias }, index) => (
                <Tr key={rut}>
                  <Td>{index + 1}</Td>
                  <Td>{`${apellidos} ${nombres}`}</Td>
                  {materias[idAsignatura.replaceAll("_", " ")].notas.map(
                    (nota, index) => (
                      <>
                        {edit ? (
                          <Td>
                            <Input
                              w="60px"
                              bgColor={"white"}
                              defaultValue={nota}
                              {...register(`nota_${index + 1}`)}
                            />
                          </Td>
                        ) : (
                          <Td>{nota}</Td>
                        )}
                      </>
                    )
                  )}
                </Tr>
              )
            )}
          </Tbody>
        </Table>
        <input type="submit" />
      </TableContainer>

      <Button
        mt="30px"
        bg="blue.400"
        color="white"
        onClick={() => setEdit((e) => !e)}
      >
        Editar
      </Button>
    </div>
  );
};

export default InfoCurso;
