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
  Stack,
  HStack,
  VStack,
  StackDivider,
  Box,
  Text,
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
  console.log("caquita", asignaturas.Física.notas);
  return (
    <>
      <Flex
        as="main"
        w="full"
        h="full"
        bg="white"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        position="relative"
        borderRadius="3xl"
      >
        {Object.getOwnPropertyNames(asignaturas)
          .sort()
          .map((nombreAsignatura) => (
            <Card
              key={nombreAsignatura}
              bg="transparent"
              size="sm"
              margin="20px"
              width={"800px"}
              _hover={{ bg: "primary" }}
              flexDirection={"row"}
            >
              <CardHeader>
                <Heading size="sm">{nombreAsignatura}</Heading>
              </CardHeader>
              {asignaturas[nombreAsignatura].notas.map((nota) => (
                <Text color={"black"}>{nota}</Text>
              ))}
            </Card>
          ))}
      </Flex>
    </>
  );
}
