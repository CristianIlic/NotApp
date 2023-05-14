import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Text,
  Heading,
  Link,
  Image,
} from "@chakra-ui/react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection } from "firebase/firestore";

const Profesor = () => {
  const profesoresRef = collection(useFirestore(), "profesores");

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreCollectionData(profesoresRef);
  if (status === "loading") {
    return <p>Cargando...</p>;
  }
  console.log("profesores", data);
  return (
    <div>
      <SimpleGrid spacing={4} minChildWidth="300px">
        {data.map((profesor) => (
          <Link
            key={profesor.rut}
            style={{ textDecoration: "none" }}
            href="/InfoCurso"
            maxW="500px"
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
                <Text>Curso: {profesor.cursos[0]} </Text>
                <Text>
                  Profesor: {`${profesor.nombres} ${profesor.apellidos}`}
                </Text>
              </CardBody>
              <CardFooter color="white">Alumnos: pendiente</CardFooter>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </div>
  );
};
export default Profesor;
