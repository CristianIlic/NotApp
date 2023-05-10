
import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Select, Stack, VStack } from '@chakra-ui/react';
import { collection, doc, getFirestore, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const AgregarEstudiante = ({ curso }) => {
    const [nombre, setNombre] = useState('');
    const [rut, setRut] = useState('');
    const [selectedCurso, setSelectedCurso] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleRutChange = (event) => {
        setRut(event.target.value);
    };

    const handleCursoChange = (event) => {
        setSelectedCurso(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //const db = getFirestore();
        const alumnoRef = doc(collection(db, 'alumnos'));
        const cursoRef = doc(collection(), 'curso', selectedCurso);
        try {
          await setDoc(alumnoRef, { nombre: nombre, rut: rut });
          await updateDoc(cursoRef, { alumnos: arrayUnion(alumnoRef) });
          setStatusMessage('Alumno agregado correctamente al curso.');
          setNombre('');
          setRut('');
          setSelectedCurso('');
        } catch (error) {
          setStatusMessage('Ocurrió un error al agregar el alumno al curso.');
          console.error(error);
        }
      };
      return (
        <VStack>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="name" color={'whiteAlpha.600'}>
                <FormLabel>Nombre</FormLabel>
                <Input type="text" value={nombre} onChange={handleNombreChange} color={'white'} />
              </FormControl>
              <FormControl id="rut" color={'white'}>
                <FormLabel>RUT</FormLabel>
                <Input type="text" value={rut} onChange={handleRutChange} color={'white'} />
              </FormControl>
              <FormControl id="curso" >
                <FormLabel>Curso</FormLabel>
                <Select value={selectedCurso} onChange={handleCursoChange} color={'white'}>
                  <option value="">Seleccione un curso</option>
                  {curso?.map((curso) => (
                    <option>
                      {curso.Nombre}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit">Agregar</Button>
            </Stack>
          </form>
          {statusMessage && <p>{statusMessage}</p>}
        </VStack>
      );
    };
    
    export default AgregarEstudiante;
