import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../AuthContext";
import notAppLogo from ".././assets/logonotapp.png";
import { Button, Text, Spinner } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { collection } from "firebase/firestore";

const Navbar = () => {
  const profesoresRef = collection(useFirestore(), "profesores");
  const apoderadosRef = collection(useFirestore(), "apoderados");
  const { status: statusProfesores, data: profesores } =
    useFirestoreCollectionData(profesoresRef);
  const { status: statusApoderados, data: apoderados } =
    useFirestoreCollectionData(apoderadosRef);

  const logout = async () => {
    await signOut(auth);
    console.log("Se cerró sesión");
  };
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const nombreUsuario = user?.displayName;

  if (statusProfesores === "loading" && statusApoderados === "loading") {
    return <Spinner color="white" />;
  }
  const idProfesor = profesores.map(
    ({ NO_ID_FIELD: idProfesor }) => idProfesor
  );
  const idApoderado = apoderados.map(
    ({ NO_ID_FIELD: idApoderado }) => idApoderado
  );
  return (
    <nav className="navbar">
      <Link to="/">
        <div className="navbar-izq">
          <img src={notAppLogo} alt="NotApp logo" className="logo-navbar" />
          <Text fontSize="3em">NotApp</Text>
        </div>
      </Link>
      {user && (
        <div className="links">
          <Text>Bienvenido {nombreUsuario} 🖐</Text>
          {idProfesor.includes(user.uid) && (
            <Link m="5px" to="/profesor">
              <Button
                m="5px"
                bg="secondary"
                color="white"
                _hover={{
                  background: "primary",
                }}
              >
                Profesor
              </Button>
            </Link>
          )}
          <Link m="5px" to="/calendario">
            <Button
              m="5px"
              bg="secondary"
              color="white"
              _hover={{
                background: "primary",
              }}
            >
              Calendario
            </Button>
          </Link>
          {/*  <Link m="5px" to="/apoderado">
            <Button
              m="5px"
              bg="secondary"
              color="white"
              _hover={{
                background: "primary",
              }}
            >
              Apoderado
            </Button>
          </Link> */}
          <Button
            m="5px"
            bg="secondary"
            color="white"
            _hover={{
              background: "primary",
            }}
            onClick={logout}
          >
            Cerrar sesión
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
