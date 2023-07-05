import {
  useFirestore,
  useFirestoreCollectionData,
  useFirestoreDocData,
  useSigninCheck,
} from "reactfire";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getFirestore,
} from "firebase/firestore";
import { MdMenu } from "react-icons/md";
import { useOutletContext } from "react-router-dom";
import {
  Flex,
  HStack,
  Text,
  Card,
  CardHeader,
  Heading,
  Spinner,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useState } from "react";
import AlumnosAvatars from "../components/Alumnos";
import { AlumnosDetail } from "../components/AlumnosDetail";

const Apoderado = () => {
  const { uid } = useOutletContext();
  const [selectedAlumno, setSelectedAlumno] = useState("");
  const db = getFirestore();
  const apoderadoRef = doc(db, "usuario", uid);
  const { status: statusApoderado, data: apoderado } =
    useFirestoreDocData(apoderadoRef);

  if (statusApoderado === "loading") {
    return <Spinner color="primary" />;
  }

  const alumnosApoderado = apoderado?.alumnos?.map((alumno) => {
    const ref = doc(db, "usuario", alumno);
    const { status: statusAlumno, data: dataAlumno } = useFirestoreDocData(ref);
    return {
      name: `${dataAlumno.nombres} ${dataAlumno.apellidos}`,
      id: dataAlumno.NO_ID_FIELD,
    };
  });

  return (
    <div>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>Notas</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <HStack
              borderRadius="8px"
              maxW="1200px"
              w="full"
              h="88vh"
              bg="gray.100"
              padding={10}
              m="0 auto"
            >
              <AlumnosAvatars
                listadoAlumnos={alumnosApoderado.map(({ name, id }) => {
                  return { name, id };
                })}
                setSelectedAlumno={setSelectedAlumno}
              />

              <AlumnosDetail
                selectedAlumno={selectedAlumno || apoderado.alumnos[0]}
              />
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Apoderado;
