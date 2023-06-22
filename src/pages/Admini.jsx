import { Box, Button, Text } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import firebaseConfig from "../firebase-config";

initializeApp(firebaseConfig);

//iniciar servicios
const db = getFirestore();

//referencia a la coleccion
const colRef = collection(db, "alumnos");

// queries

const q = query(colRef, orderBy("apellidos"));

//data de la coleccion en tiempo real

const alumnos = [];

onSnapshot(q, (snapshot) => {
  snapshot.docs.forEach((doc) => {
    alumnos.push({ ...doc.data(), id: doc.id });
  });
});

const Admini = () => {
  return (
    <Navbar>
      <div className="body-admini">
        <Text stroke="whiteAlpha.400" color="black" fontSize="30px">
          Menú Admin
        </Text>
        <Link to="/admini/signup-profesor">
          <Button
            size="lg"
            bg="primary"
            color="white"
            _hover={{ background: "primaryHover" }}
          >
            <EditIcon />
            Registro Profesor
          </Button>
        </Link>
        <Link to="/admini/signup-apoderado">
          <Button
            size="lg"
            bg="primary"
            color="white"
            _hover={{ background: "primaryHover" }}
          >
            <EditIcon />
            Registro Apoderado
          </Button>
        </Link>
        <Link to="/admini/signup-alumno">
          <Button
            size="lg"
            bg="primary"
            color="white"
            _hover={{ background: "primaryHover" }}
          >
            <EditIcon />
            Registro Alumno
          </Button>
        </Link>
      </div>
    </Navbar>
  );
};

export default Admini;
