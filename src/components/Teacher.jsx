import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Text,
  Heading,
  Link,
  Image
} from "@chakra-ui/react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection } from "firebase/firestore";

const Teacher = () => {
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
          <Link style={{ textDecoration: "none" }} href="/InfoCurso">
            <Card>
              <CardHeader>
                <Image src="/banner.jpg" alt="Foto Libros" borderRadius='8px' width='100%' height='100px'/>
              </CardHeader>
              <CardBody>
              <Text>Curso: {profesor.curso} </Text>
                <Text>
                  Profesor:
                  <p>
                    {`${profesor.nombres} ${profesor.apellidos}`}
                  </p>
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

export default Teacher;
