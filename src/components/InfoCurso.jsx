import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { AiOutlineEdit } from 'react-icons/ai'

import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, orderBy, query } from "firebase/firestore";

const InfoCurso = () => {
  const alumnosRef = collection(useFirestore(), "alumnos");
  const orderedAlumnosRef = query(alumnosRef, orderBy("apellidos"));
  

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreCollectionData(orderedAlumnosRef);
  if (status === "loading") {
    return <p>Cargando...</p>;
  }
console.log('alumnos', data)
  return (
    <TableContainer bgColor="white" borderRadius="8px">
      <Table variant="striped" colorScheme="purple">
        <Thead>
          <Tr>
            <Th>N°</Th>
            <Th>Alumno</Th>
            <Th>Nota 1 <AiOutlineEdit size={'20px'}/></Th>
            <Th>Nota 2 <AiOutlineEdit size={'20px'}/></Th>
            <Th>Nota 3 <AiOutlineEdit size={'20px'}/></Th>
            <Th>Nota 4 <AiOutlineEdit size={'20px'}/></Th>
            <Th>Nota 5 <AiOutlineEdit size={'20px'}/></Th>
            <Th>Nota 6 <AiOutlineEdit size={'20px'}/></Th>
            <Th>Nota 7 <AiOutlineEdit size={'20px'}/></Th>
            <Th>Nota 8 <AiOutlineEdit size={'20px'}/></Th>
            <Th>Nota 9 <AiOutlineEdit size={'20px'}/></Th>
            <Th>Nota 10 <AiOutlineEdit size={'20px'}/></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((alumno, index) => (
            <Tr key={alumno.rut}>
              <Td>{index + 1}</Td>
              <Td>{`${alumno.apellidos} ${alumno.nombres}`}</Td>
              <Td>
                <NumberInput>
                  <NumberInputField padding='0px' w='35px' bgColor="white"></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField padding='0px' w='35px' bgColor="white"></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField padding='0px' w='35px' bgColor="white"></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField padding='0px' w='35px' bgColor="white"></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField padding='0px' w='35px' bgColor="white"></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField padding='0px' w='35px' bgColor="white"></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField padding='0px' w='35px' bgColor="white"></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField padding='0px' w='35px' bgColor="white"></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField padding='0px' w='35px' bgColor="white"></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField padding='0px' w='35px' bgColor="white"></NumberInputField>
                </NumberInput>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default InfoCurso;
