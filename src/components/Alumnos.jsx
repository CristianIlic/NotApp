import React from "react";
import { Wrap, WrapItem, Avatar } from "@chakra-ui/react";

export default function Alumnos({ listadoAlumnos, setSelectedAlumno }) {
  return (
    <Wrap mb={"20px"}>
      {listadoAlumnos?.map((id) => {
        return (
          <WrapItem>
            <Avatar onClick={() => setSelectedAlumno(id)} size="lg" name={id} />
          </WrapItem>
        );
      })}
    </Wrap>
  );
}
