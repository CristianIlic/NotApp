import { Box, Button, Text } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
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
    <div>
      <div className="body-admini">
        <Text color="black" fontSize="30px">
          Menú Admin
        </Text>
        <Link to="/admini/signup">
          <Button
            size="lg"
            bg="secondary"
            color="white"
            _hover={{ background: "primary" }}
          >
            <EditIcon />
            Registro
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Admini;
