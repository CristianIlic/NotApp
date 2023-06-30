import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection } from "firebase/firestore";
import Navbar from "../components/Navbar";

import { MdMenu } from "react-icons/md";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Spinner,
} from "@chakra-ui/react";

const Apoderado = () => {
  const asignaturasRef = collection(useFirestore(), "asignaturas");
  const { status, data } = useFirestoreCollectionData(asignaturasRef);
  if (status === "loading") {
    return <Spinner color="primary" />;
  }

  return (
    <div>
      <HStack
        borderRadius="8px"
        maxW="1200px"
        w="full"
        h="100vh"
        bg="gray.100"
        padding={10}
        m="0 auto"
      >
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
          {data.map((asignaturas) => (
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
          <Text fontSize={100} color="gray.300">
            Peo
          </Text>
        </Flex>
      </HStack>
    </div>
  );
};

export default Apoderado;
