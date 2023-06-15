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
import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useState } from "react";

const Profesor = () => {
  const [selectedCurso, setSelectedCurso] = useState("1-EMA-23");
  const cursosRef = collection(useFirestore(), "curso");
  const asignaturasCursoRef = collection(
    useFirestore(),
    "curso",
    selectedCurso,
    "asignaturas"
  );
  const { data: asignaturas } = useFirestoreCollectionData(asignaturasCursoRef);

  // subscribe to a document for realtime updates. just one line!
  const { status, data: cursos } = useFirestoreCollectionData(cursosRef);
  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  console.log("CURSO CURSO", cursos);
  return (
    <div>
      <SimpleGrid spacing={4} minChildWidth="300px">
        {cursos.map(({ NO_ID_FIELD: idCurso, nombre: nombreCurso }) => {
          return (
            <div key={idCurso}>
              {asignaturas.map(
                ({
                  id: idAsignatura,
                  idProfesor,
                  nombre: nombreAsignatura,
                  nombreProfesor,
                }) => {
                  return (
                    <Link
                      key={idAsignatura}
                      style={{ textDecoration: "none" }}
                      to={`/cursos/${idCurso}@${idAsignatura}`}
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
                          <Text>Profesor: {nombreProfesor}</Text>
                          <Text>Curso: {nombreCurso} </Text>
                          <Text>Asignatura: {nombreAsignatura} </Text>
                        </CardBody>
                        {/* <CardFooter color="white">
                            Alumnos: pendiente
                          </CardFooter> */}
                      </Card>
                    </Link>
                  );
                }
              )}
            </div>
          );
        })}
      </SimpleGrid>
    </div>
  );
};
export default Profesor;
