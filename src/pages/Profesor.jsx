import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Text,
  Heading,
  Image,
} from "@chakra-ui/react";
import {
  useFirestore,
  useFirestoreCollectionData,
  useAuth,
  useFirestoreDocData,
} from "reactfire";

import {
  collection,
  query,
  where,
  doc,
  getFirestore,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Profesor = () => {
  const { currentUser } = useAuth();
  const db = getFirestore();
  const profesoresRef = doc(db, "usuario", currentUser.uid);

  const cursosRef = collection(useFirestore(), "curso");

  const { data: profesor, status: statusProfesores } =
    useFirestoreDocData(profesoresRef);

  // subscribe to a document for realtime updates. just one line!
  const { status: statusCursos, data: cursos } =
    useFirestoreCollectionData(cursosRef);

  // useEffect(() => {
  //   if (statusCursos === "success" && statusProfesores === "success") {
  //     const cursosFormateados = cursos.flatMap(
  //       ({ NO_ID_FIELD, nombre: nombreCurso }) => {
  //         const profesoresPorCurso = profesores.flatMap(
  //           ({ nombres, apellidos, curso }) => {
  //             if (!!curso[NO_ID_FIELD]) {
  //               return curso[NO_ID_FIELD].asignatura.map((asignatura) => ({
  //                 idCurso: NO_ID_FIELD,
  //                 nombreCurso,
  //                 nombres,
  //                 apellidos,
  //                 asignatura,
  //               }));
  //             }

  //             return;
  //           }
  //         );

  //         return profesoresPorCurso.filter((dddd) => dddd !== undefined);
  //       }
  //     );

  //     setCards(cursosFormateados);
  //   }
  // }, [profesores, cursos, statusCursos, statusProfesores]);

  if (statusProfesores === "loading" && statusCursos === "loading") {
    return <p>Cargando...</p>;
  }

  const cards = Object.keys(profesor.curso).flatMap((key) => {
    const asignaturas = profesor.curso[key].asignatura;

    const card = asignaturas.map((nombreAsignatura) => ({
      profesor: `${profesor.nombres} ${profesor.apellidos}`,
      asignatura: nombreAsignatura,
      idCurso: key,
      nombreCurso: cursos?.find(({ NO_ID_FIELD: idCurso }) => idCurso === key)
        .nombre,
    }));

    return card;
  });

  return (
    <SimpleGrid spacing={4} minChildWidth="400px">
      {cards.map(({ profesor, asignatura, idCurso, nombreCurso }) => {
        return (
          <div key={nombreCurso + asignatura}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/cursos/${idCurso}@${asignatura}`}
            >
              <Card maxW="500px">
                <CardHeader>
                  <Image
                    src="/banner.jpg"
                    alt="Foto Libros"
                    borderRadius="8px"
                    width="100%"
                    height="100px"
                  />
                </CardHeader>
                <CardBody>
                  <Text>Profesor: {profesor}</Text>
                  <Text>Curso: {nombreCurso} </Text>
                  <Text>Asignatura: {asignatura} </Text>
                </CardBody>
                {/* <CardFooter color="white">
                            Alumnos: pendiente
                          </CardFooter> */}
              </Card>
            </Link>
          </div>
        );
      })}
    </SimpleGrid>
  );
};
export default Profesor;
