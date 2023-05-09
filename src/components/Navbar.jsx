import { signOut } from "firebase/auth";
import { auth } from "../AuthContext";
import notAppLogo from ".././assets/logonotapp.png";

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
        <a href="/teacher">Profesor</a>
        <a href="/admini">Admin</a>
        <a onClick={logout}>Cerrar sesión</a>
      </div>
    </nav>
  );
};

export default Navbar;
