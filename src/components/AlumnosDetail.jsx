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
  Spacer,
  CardBody,
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
              height="10vmin"
              width={"90vmin"}
              _hover={{ bg: "primary" }}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Flex
                justifyContent={"space-around"}
                width={"100%"}
                alignItems={"center"}
              >
                <CardHeader w={"20vmin"}>
                  <Heading size="sm">{nombreAsignatura}</Heading>
                </CardHeader>
                <Spacer />
                {asignaturas[nombreAsignatura].notas.map((nota) => {
                  if (nota >= 6) {
                    return (
                      <div className="greenCircle">
                        <Text fontSize={"1.5vmin"} color={"white"}>
                          {nota}
                        </Text>
                      </div>
                    );
                  } else if (nota >= 5 && nota < 6) {
                    return (
                      <div className="yellowCircle">
                        <Text fontSize={"1.5vmin"} color={"white"}>
                          {nota}
                        </Text>
                      </div>
                    );
                  } else if (nota >= 4 && nota < 5) {
                    return (
                      <div className="orangeCircle">
                        <Text fontSize={"1.5vmin"} color={"white"}>
                          {nota}
                        </Text>
                      </div>
                    );
                  } else if (nota >= 0.1 && nota < 4) {
                    return (
                      <div className="redCircle">
                        <Text fontSize={"1.5vmin"} color={"white"}>
                          {nota}
                        </Text>
                      </div>
                    );
                  } else {
                    return (
                      <div className="grayCircle">
                        <Text fontSize={"1.5vmin"} color={"white"}>
                          {nota}
                        </Text>
                      </div>
                    );
                  }
                })}
                <Spacer />
                <CardHeader w={"12vmin"} color={"black"}>
                  Promedio actual
                </CardHeader>
                {asignaturas[nombreAsignatura].promedio && (
                  <>
                    {asignaturas[nombreAsignatura].promedio >= 6 && (
                      <div className="greenCircle">
                        <Text fontSize={"1.5vmin"} color={"white"}>
                          {asignaturas[nombreAsignatura].promedio}
                        </Text>
                      </div>
                    )}
                    {asignaturas[nombreAsignatura].promedio >= 5 &&
                      asignaturas[nombreAsignatura].promedio < 6 && (
                        <div className="yellowCircle">
                          <Text fontSize={"1.5vmin"} color={"white"}>
                            {asignaturas[nombreAsignatura].promedio}
                          </Text>
                        </div>
                      )}
                    {asignaturas[nombreAsignatura].promedio >= 4 &&
                      asignaturas[nombreAsignatura].promedio < 5 && (
                        <div className="orangeCircle">
                          <Text fontSize={"1.5vmin"} color={"white"}>
                            {asignaturas[nombreAsignatura].promedio}
                          </Text>
                        </div>
                      )}
                    {asignaturas[nombreAsignatura].promedio >= 0.1 &&
                      asignaturas[nombreAsignatura].promedio < 4 && (
                        <div className="redCircle">
                          <Text fontSize={"1.5vmin"} color={"white"}>
                            {asignaturas[nombreAsignatura].promedio}
                          </Text>
                        </div>
                      )}
                    {asignaturas[nombreAsignatura].promedio == 0 && (
                      <div className="grayCircle">
                        <Text p={"0px"} fontSize={"1.5vmin"} color={"white"}>
                          {asignaturas[nombreAsignatura].promedio}
                        </Text>
                      </div>
                    )}
                  </>
                )}
              </Flex>
            </Card>
          ))}
      </Flex>
    </>
  );
}
