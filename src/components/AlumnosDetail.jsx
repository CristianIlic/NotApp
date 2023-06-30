import React from "react";
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
} from "@chakra-ui/react";
import { useFirestoreDocData } from "reactfire";

export function AlumnosAsignatura({ selectedAlumno }) {
  const db = getFirestore();
  const alumnosRef = doc(db, "usuario", selectedAlumno);
  const { status: statusAlumnos, data: alumnos } =
    useFirestoreDocData(alumnosRef);

  const asignaturas = alumnos?.asignaturas;
  if (asignaturas) {
    const nombresAsignaturas = Object.getOwnPropertyNames(asignaturas);

    {
      return nombresAsignaturas.sort().map((asignatura) => {
        return (
          <Card bg="transparent" size="sm" margin="20px" width={60}>
            <CardHeader>
              <Heading size="sm">{asignatura}</Heading>
            </CardHeader>
          </Card>
        );
      });
    }
  } else {
    return (
      <Card bg="transparent" size="sm" margin="20px" width={60}>
        <CardHeader>
          <Heading size="sm">No hay asignaturas</Heading>
        </CardHeader>
      </Card>
    );
  }
}

export function AlumnosDetail({ selectedAlumno, notas }) {
  const db = getFirestore();
  const alumnosRef = doc(db, "usuario", selectedAlumno);
  const { status: statusAlumnos, data: alumnos } =
    useFirestoreDocData(alumnosRef);

  return (
    <UnorderedList>
      {["6.7", "5.7", "6.1"].map(() => (
        <ListItem>Lorem ipsum dolor sit amet</ListItem>
      ))}
    </UnorderedList>
  );
}
