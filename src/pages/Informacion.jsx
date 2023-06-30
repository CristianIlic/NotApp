import React from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Image,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";

const Informacion = () => {
  const links = [
    {
      id: 1,
      title: "Recomendación de guías de reforzamiento",
      description:
        "Guias de Reforzamiento para todo curso, creadas por colegio Heinrich High School",
      imageUrl: "/guias_de_reforzamiento.png",
      linkUrl: "http://heinrich.cl/new/alumnos/guias-de-reforzamiento/",
    },
    {
      id: 2,
      title: "Biblioteca Virtual",
      description:
        "Accede a una amplia colección de libros del Ministerio de Educación",
      imageUrl: "/biblioteca_virtual.jpg",
      linkUrl: "https://bdescolar.mineduc.cl/?locale=es",
    },
    {
      id: 3,
      title: "Cpech",
      description: "Accede aquí a la página oficial del preuniversitario Cpech",
      imageUrl: "/cpech.jpeg",
      linkUrl: "https://cpech.cl/por-que-estudiar-aqui/",
    },
    {
      id: 4,
      title: "Filadd",
      description:
        "Accede aquí a la página oficial del preuniversitario Filadd",
      imageUrl: "/filadd.jpeg",
      linkUrl:
        "https://filadd.cl/?utm_source=google&utm_medium=mvc&utm_campaign=cl_ventas_preu&utm_term=preuniversitario&gclid=Cj0KCQjwnMWkBhDLARIsAHBOftol-gXZdzNUEOsmlWIgt7z867d4kOSmJ7thAyZhkJf6LYf-BHteVRoaAnTTEALw_wcB",
    },
    {
      id: 5,
      title: "Preuniversitario UC",
      description: "Accede aquí a la página oficial del preuniversitario UC",
      imageUrl: "/preu_uc.jpeg",
      linkUrl: "https://preuniversitario.uc.cl/",
    },
  ];

  const firstSection = links.slice(0, 2);
  const secondSection = links.slice(2);

  return (
    <Box maxW="1550px" mx="auto" p="4">
      <Box textAlign="center" mb="10">
        <Text fontWeight="bold" fontSize="35" textDecorationLine="none">
          Reforzamiento y Libros
        </Text>
      </Box>
      <SimpleGrid columns={2} spacing={0} mb="">
        {firstSection.map(({ id, title, description, imageUrl, linkUrl }) => (
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" key={id}>
            <Box
              maxW="500px"
              borderWidth="5px"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="lg"
              mx="auto"
            >
              <Image
                src={imageUrl}
                alt="Imagen"
                borderRadius="8px"
                width="100%"
                height="300px"
              />
              <Box p="4">
                <Text fontWeight="bold">{title}</Text>
                <Text fontSize={"16px"}>{description}</Text>
              </Box>
            </Box>
          </a>
        ))}
      </SimpleGrid>

      <Divider m="10vmin 0 10vmin" />

      <Box textAlign="center" mb="10">
        <Text fontWeight="bold" fontSize="35" textDecorationLine="none">
          Preuniversitarios Recomendados
        </Text>
      </Box>
      <SimpleGrid columns={3} spacing={10}>
        {secondSection.map(({ id, title, description, imageUrl, linkUrl }) => (
          <a href={linkUrl} target="_blank" rel="noopener noreferrer" key={id}>
            <Box
              maxW="500px"
              borderWidth="5px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="xl"
              mx="auto"
            >
              <Image
                src={imageUrl}
                alt="Imagen"
                borderRadius="8px"
                width="100%"
                height="300px"
              />
              <Box p="4">
                <Text fontWeight="bold">{title}</Text>
                <Text fontSize={"16px"}>{description}</Text>
              </Box>
            </Box>
          </a>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Informacion;
