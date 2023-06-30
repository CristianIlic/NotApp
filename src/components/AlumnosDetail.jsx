import React, { useState } from "react";
import { doc, getFirestore } from "firebase/firestore";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Card,
  CardHeader,
  Heading,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { useFirestoreDocData } from "reactfire";

export function AlumnosDetail({ selectedAlumno }) {
  const db = getFirestore();
  const [selectedAsignatura, setSelectedAsignatura] = useState("");
  const alumnosRef = doc(db, "usuario", selectedAlumno);
  const { status: statusAlumnos, data: alumnos } =
    useFirestoreDocData(alumnosRef);

  const asignaturas = alumnos?.asignaturas;
  if (statusAlumnos === "loading") {
    return <Spinner color="primary" />;
  }
  console.log("caquita", Object.getOwnPropertyNames(asignaturas));
  return (
    <>
      <Flex
        as="main"
        w="full"
        h="full"
        bg="white"
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        position="relative"
        borderRadius="3xl"
      >
        <Flex flexDirection={"column"}>
          {Object.getOwnPropertyNames(asignaturas)
            .sort()
            .map((asignatura) => (
              <Card
                key={asignatura}
                bg="transparent"
                size="sm"
                margin="20px"
                width={60}
                onClick={(e) => setSelectedAsignatura(e.target.outerText)}
                _hover={{ bg: "primary" }}
              >
                <CardHeader>
                  <Heading size="sm">{asignatura}</Heading>
                </CardHeader>
              </Card>
            ))}
        </Flex>

        <UnorderedList>
          {selectedAsignatura &&
            asignaturas[selectedAsignatura].notas.map((nota) => (
              <ListItem>{nota}</ListItem>
            ))}
        </UnorderedList>
      </Flex>
    </>
  );
}
