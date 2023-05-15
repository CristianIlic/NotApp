import { signOut } from "firebase/auth";
import { auth } from "../AuthContext";
import notAppLogo from ".././assets/logonotapp.png";
import { Button, Link } from "@chakra-ui/react";

const Navbar = () => {
  const logout = async () => {
    await signOut(auth);
    console.log("Se cerró sesión");
  };

  return (
    <nav className="navbar">
      <a href="/">
        <div className="navbar-izq">
          <img src={notAppLogo} alt="NotApp logo" className="logo-navbar" />
          <h2>NotApp</h2>
        </div>
      </a>
      <div className="links">
        <Link m="3px" href="/profesor">
          <Button
            m="3px"
            bg="secondary"
            color="white"
            _hover={{
              background: "primary",
            }}
          >
            Profesor
          </Button>
        </Link>
        <Link m="3px" href="/admini">
          <Button
            m="3px"
            bg="secondary"
            color="white"
            _hover={{
              background: "primary",
            }}
          >
            Admin
          </Button>
        </Link>
        <Link m="3px" href="/calendario">
          <Button
            m="3px"
            bg="secondary"
            color="white"
            _hover={{
              background: "primary",
            }}
          >
            Calendario
          </Button>
        </Link>
        <Button
          m="3px"
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
    </nav>
  );
};

export default Navbar;
