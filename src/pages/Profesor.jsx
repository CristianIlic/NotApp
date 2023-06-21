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
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import Navbar from "../components/Navbar";

import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Profesor = () => {
  const profesoresRef = collection(useFirestore(), "profesores");
  const [cards, setCards] = useState([]);
  const cursosRef = collection(useFirestore(), "curso");

  const { data: profesores, status: statusProfesores } =
    useFirestoreCollectionData(profesoresRef);

  // subscribe to a document for realtime updates. just one line!
  const { status: statusCursos, data: cursos } =
    useFirestoreCollectionData(cursosRef);

  useEffect(() => {
    if (statusCursos === "success" && statusProfesores === "success") {
      const cursosFormateados = cursos.flatMap(
        ({ NO_ID_FIELD, nombre: nombreCurso }) => {
          const profesoresPorCurso = profesores.flatMap(
            ({ nombres, apellidos, curso }) => {
              if (!!curso[NO_ID_FIELD]) {
                return curso[NO_ID_FIELD].map((asignatura) => ({
                  idCurso: NO_ID_FIELD,
                  nombreCurso,
                  nombres,
                  apellidos,
                  asignatura,
                }));
              }

              return;
              // return { nombres, apellidos, asignaturas: curso[NO_ID_FIELD] };
            }
          );

          return profesoresPorCurso.filter((dddd) => dddd !== undefined);
        }
      );

      setCards(cursosFormateados);
    }
  }, [profesores, cursos, statusCursos, statusProfesores]);

  console.log("profesores", profesores);
  console.log("cursos", cursos);

  if (cards === 0) {
    return <p>Cargando...</p>;
  }

  console.log("cards", cards);

  // return (
  return (
    <Navbar>
      <SimpleGrid spacing={4} minChildWidth="300px">
        {cards.map(
          ({ idCurso, nombreCurso, nombres, apellidos, asignatura }) => {
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
                      <Text>
                        Profesor: {nombres} {apellidos}
                      </Text>
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
          }
        )}
      </SimpleGrid>
    </Navbar>
  );
};
export default Profesor;
