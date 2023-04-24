import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Select
  } from '@chakra-ui/react'
const ModalEdit = ({buttonText, modalTitle}) => {
    
const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button size='sm' bg='blue.400' color='white' onClick={onOpen}>{ buttonText }</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Seleccione alumno:</FormLabel>
                <Select></Select>
            </FormControl>
          </ModalBody>

          <ModalFooter display='flex' justifyContent='space-between'>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Eliminar
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Modificar
            </Button>
            <Button colorScheme="green">Agregar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEdit;
