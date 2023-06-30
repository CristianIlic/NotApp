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
import { AlumnosDetail, AlumnosAsignatura } from "../components/AlumnosDetail";

const Apoderado = () => {
  const { uid } = useOutletContext();
  const [selectedAlumno, setSelectedAlumno] = useState("");
  const db = getFirestore();
  const asignaturasRef = collection(useFirestore(), "asignaturas");
  const { status: statusAsignaturas, data: asignaturas } =
    useFirestoreCollectionData(asignaturasRef);

  const apoderadoRef = doc(db, "usuario", uid);
  const { status: statusApoderado, data: apoderado } =
    useFirestoreDocData(apoderadoRef);

  if (statusApoderado === "loading") {
    return <Spinner color="primary" />;
  }

  return (
    <div>
      <Tabs variant="soft-rounded">
        <TabList>
          <Tab>Notas</Tab>
          <Tab>Observaciones</Tab>
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
                listadoAlumnos={apoderado?.alumnos?.map((alumno) => alumno)}
                setSelectedAlumno={setSelectedAlumno}
              />
              <Flex
                as="aside"
                w="full"
                h="full"
                maxW={350}
                bg="white"
                alignItems="start"
                padding={6}
                flexDirection="column"
                justifyContent="flex-start"
                transition="ease-in-out .2s"
                borderRadius="3xl"
              >
                <AlumnosAsignatura
                  selectedAlumno={selectedAlumno || apoderado.alumnos[0]}
                />
              </Flex>
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
                <AlumnosDetail
                  selectedAlumno={selectedAlumno || apoderado.alumnos[0]}
                />
              </Flex>
            </HStack>
          </TabPanel>
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
                listadoAlumnos={apoderado?.alumnos?.map((alumno) => alumno)}
                setSelectedAlumno={setSelectedAlumno}
              />
              <Flex
                as="aside"
                w="full"
                h="full"
                maxW={350}
                bg="white"
                alignItems="start"
                padding={6}
                flexDirection="column"
                justifyContent="flex-start"
                transition="ease-in-out .2s"
                borderRadius="3xl"
              >
                {asignaturas.map((asignaturas) => (
                  <Card bg="transparent" size="sm" margin="20px" width={60}>
                    <CardHeader>
                      <Heading size="sm">Curso: {asignaturas.nombre}</Heading>
                    </CardHeader>
                  </Card>
                ))}
              </Flex>
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
                DIA Y HORA DE OBSERVACIONES
              </Flex>
            </HStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Apoderado;
