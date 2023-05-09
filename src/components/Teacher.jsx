import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Text,
  Heading,
  Link,
} from "@chakra-ui/react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection} from "firebase/firestore";

const Teacher = () => {
  const profesoresRef = collection(useFirestore(), "profesores");

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreCollectionData(profesoresRef);
  if (status === "loading") {
    return <p>Cargando...</p>;
  }
  console.log('profesores',data)
  return (
    <div>
      <SimpleGrid spacing={4} minChildWidth="300px">
        {data.map((profesor, index) => (
    <Link key={index} style={{ textDecoration: "none" }} href="/InfoCurso">
      <Card>
        <CardHeader>
          <Heading size="md">Curso 1</Heading>
        </CardHeader>
        <CardBody>
          <Text>
            Profesor: <p>{profesor.nombres}{profesor.apellidos}</p>
          </Text>
          <Text>Curso: {profesor.curso} </Text>
        </CardBody>
        <CardFooter color="white">Alumnos: pendiente</CardFooter>
      </Card>
    </Link>
  ))}
      </SimpleGrid>
    </div>
  );
};

export default Teacher;