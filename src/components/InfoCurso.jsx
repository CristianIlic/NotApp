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
  Button,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import { useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection, orderBy, query } from "firebase/firestore";

const InfoCurso = () => {
  const [edit, setEdit] = useState(true);

  const handleEdit = () => {
    setEdit(false)
    if (edit == false){
      setEdit(true)
    };
  };

  const alumnosRef = collection(useFirestore(), "alumnos");
  const orderedAlumnosRef = query(alumnosRef, orderBy("apellidos"));

  // subscribe to a document for realtime updates. just one line!
  const { status, data } = useFirestoreCollectionData(orderedAlumnosRef);
  if (status === "loading") {
    return <p>Cargando...</p>;
  }

  console.log("alumnos", data);
  return edit ? (
    <div>
      <TableContainer bgColor="white" borderRadius="8px">
        <Table variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>N°</Th>
              <Th>Alumno</Th>
              <Th>Nota 1</Th>
              <Th>Nota 2</Th>
              <Th>Nota 3</Th>
              <Th>Nota 4</Th>
              <Th>Nota 5</Th>
              <Th>Nota 6</Th>
              <Th>Nota 7</Th>
              <Th>Nota 8</Th>
              <Th>Nota 9</Th>
              <Th>Nota 10</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((alumno, index) => (
              <Tr key={alumno.rut}>
                <Td>{index + 1}</Td>
                <Td>{`${alumno.apellidos} ${alumno.nombres}`}</Td>
                <Td>
                  <div></div>
                </Td>
                <Td>
                  <div></div>
                </Td>
                <Td>
                  <div></div>
                </Td>
                <Td>
                  <div></div>
                </Td>
                <Td>
                  <div></div>
                </Td>
                <Td>
                  <div></div>
                </Td>
                <Td>
                  <div></div>
                </Td>
                <Td>
                  <div></div>
                </Td>
                <Td>
                  <div></div>
                </Td>
                <Td>
                  <div></div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Button
      mt='30px'
      bg='blue.400'
      color='white'
      onClick={handleEdit}>Editar</Button>
    </div>
  ) : (
    <div>
    <TableContainer bgColor="white" borderRadius="8px">
      <Table variant="striped" colorScheme="purple">
        <Thead>
          <Tr>
            <Th>N°</Th>
            <Th>Alumno</Th>
            <Th>
              Nota 1 <AiOutlineEdit size={"20px"} />
            </Th>
            <Th>
              Nota 2 <AiOutlineEdit size={"20px"} />
            </Th>
            <Th>
              Nota 3 <AiOutlineEdit size={"20px"} />
            </Th>
            <Th>
              Nota 4 <AiOutlineEdit size={"20px"} />
            </Th>
            <Th>
              Nota 5 <AiOutlineEdit size={"20px"} />
            </Th>
            <Th>
              Nota 6 <AiOutlineEdit size={"20px"} />
            </Th>
            <Th>
              Nota 7 <AiOutlineEdit size={"20px"} />
            </Th>
            <Th>
              Nota 8 <AiOutlineEdit size={"20px"} />
            </Th>
            <Th>
              Nota 9 <AiOutlineEdit size={"20px"} />
            </Th>
            <Th>
              Nota 10 <AiOutlineEdit size={"20px"} />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((alumno, index) => (
            <Tr key={alumno.rut}>
              <Td>{index + 1}</Td>
              <Td>{`${alumno.apellidos} ${alumno.nombres}`}</Td>
              <Td>
                <NumberInput>
                  <NumberInputField
                    padding="0px"
                    w="35px"
                    bgColor="white"
                  ></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField
                    padding="0px"
                    w="35px"
                    bgColor="white"
                  ></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField
                    padding="0px"
                    w="35px"
                    bgColor="white"
                  ></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField
                    padding="0px"
                    w="35px"
                    bgColor="white"
                  ></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField
                    padding="0px"
                    w="35px"
                    bgColor="white"
                  ></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField
                    padding="0px"
                    w="35px"
                    bgColor="white"
                  ></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField
                    padding="0px"
                    w="35px"
                    bgColor="white"
                  ></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField
                    padding="0px"
                    w="35px"
                    bgColor="white"
                  ></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField
                    padding="0px"
                    w="35px"
                    bgColor="white"
                  ></NumberInputField>
                </NumberInput>
              </Td>
              <Td>
                <NumberInput>
                  <NumberInputField
                    padding="0px"
                    w="35px"
                    bgColor="white"
                  ></NumberInputField>
                </NumberInput>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    <Button
    mt='30px'
    bg='green.400'
    color='white'
    onClick={handleEdit}>Guardar</Button>
    </div>
  );
};

export default InfoCurso;
