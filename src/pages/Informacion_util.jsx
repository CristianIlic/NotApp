import React from "react";
import { Box, SimpleGrid, Text, Image, ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const Informacion_util = () => {
  const links = [
    {
      id: 1,
      title: "Recomendación de guías de reforzamiento",
      description: "Guias de Reforzamiento para todo curso",
      imageUrl: "/banner.jpg",
      linkUrl: "http://heinrich.cl/new/alumnos/guias-de-reforzamiento/",
    },
    {
      id: 2,
      title: "Biblioteca Virtual",
      description: "Accede a una amplia colección de libros",
      imageUrl: "/banner.jpg",
      linkUrl: "https://bdescolar.mineduc.cl/?locale=es",
    },
    {
      id: 3,
      title: "Cpech",
      description: "Preuniversitario Cpech",
      imageUrl: "/banner.jpg",
      linkUrl: "https://cpech.cl/por-que-estudiar-aqui/",
    },
    {
      id: 4,
      title: "Filadd",
      description: "Preuniversitario Filadd",
      imageUrl: "/banner.jpg",
      linkUrl: "https://filadd.cl/?utm_source=google&utm_medium=mvc&utm_campaign=cl_ventas_preu&utm_term=preuniversitario&gclid=Cj0KCQjwnMWkBhDLARIsAHBOftol-gXZdzNUEOsmlWIgt7z867d4kOSmJ7thAyZhkJf6LYf-BHteVRoaAnTTEALw_wcB",
    },
    {
      id: 5,
      title: "Preuniversitario UC",
      description: "Preuniversitario UC",
      imageUrl: "/banner.jpg",
      linkUrl: "https://preuniversitario.uc.cl/",
    },
  ];

  return (
    <ChakraProvider>
      <Navbar>
        <SimpleGrid columns={[1, 2, 3]} spacing={4} minChildWidth="300px">
          {links.map(({ id, title, description, imageUrl, linkUrl }) => (
            <a href={linkUrl} target="_blank" rel="noopener noreferrer" key={id}>
              <Box maxW="500px" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Image src={imageUrl} alt="Imagen" borderRadius="8px" width="100%" height="100px" />
                <Box p="4">
                  <Text fontWeight="bold">{title}</Text>
                  <Text>{description}</Text>
                </Box>
              </Box>
            </a>
          ))}
        </SimpleGrid>
      </Navbar>
    </ChakraProvider>
  );
};

export default Informacion_util;
