import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Text,
  Heading,
  Button,
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
        {data.map((profesor) => {
          <Link style={{ textDecoration: "none" }} href="/info-curso">
            <Card>
              <CardHeader>
                <Heading size="md">Curso 1</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Profesor: <p>{profesor.nombres}</p>
                </Text>
                <Text>Curso: 1 Medio A</Text>
              </CardBody>
              <CardFooter color="white">Alumnos: pendiente</CardFooter>
            </Card>
          </Link>;
        })}
      </SimpleGrid>
    </div>
  );
};

export default Teacher;
