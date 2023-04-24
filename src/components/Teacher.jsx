import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
  Button,
} from "@chakra-ui/react";
import ModalEdit from "./ModalEdit";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
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
  console.log(alumnos);
});

const Teacher = () => {
  return (
    <div>
      <div className="body-teacher">
        <h2>Notas</h2>
        <div className="accordion">
          <Accordion allowToggle>
            <AccordionItem border="none">
              <h3>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <p>Curso 1</p>
                  </Box>
                  <AccordionIcon color="white" />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                {alumnos}

                <ModalEdit buttonText="Editar" modalTitle="Editar"></ModalEdit>
                <Button
                  size="sm"
                  bg="red"
                  color="white"
                  margin="15px"
                  _hover={{
                    background: "primary",
                  }}
                >
                  Eliminar
                </Button>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none">
              <h3>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <p>Curso 2</p>
                  </Box>
                  <AccordionIcon color="white" />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none">
              <h3>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <p>Curso 3</p>
                  </Box>
                  <AccordionIcon color="white" />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem border="none">
              <h3>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <p>Curso 4</p>
                  </Box>
                  <AccordionIcon color="white" />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
