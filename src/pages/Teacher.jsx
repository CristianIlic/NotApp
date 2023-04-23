import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { doc, getFirestore } from "firebase/firestore";
import { 
  useFirestore,
  useFirebaseApp,
  useFirestoreDocData,
  FirestoreProvider
} from "reactfire";

function ListaAlumnos(){
  const alumnosRef = doc(useFirestore(), 'tryreactfire', 'burrito');
  const { status, data } = useFirestoreDocData(alumnosRef);

  return <p>{data.yummy ? 'wena' : 'caca'}</p>
}

const Teacher = () => {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <FirestoreProvider sdk={firestoreInstance}>
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
              <p>
                Marcelo Aguilera <ListaAlumnos/>
              </p>
              <p>
                Cristian Ilic
              </p>
              <p>
                Javier Sandoval
              </p>
              <p>
                Benjamin Baeza
              </p>
              <p>
                Amanda Navarro
              </p>
              <p>
                Ignacia Alegria
              </p>
              <p>
                Daniel Morales
              </p>
              <p> 
                Valeria Fernandez
              </p>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
    </FirestoreProvider>
  );
};

export default Teacher;