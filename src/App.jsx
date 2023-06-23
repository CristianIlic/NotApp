import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignUp_apoderado from "./pages/SignUp_apoderado";
import SignUp_alumno from "./pages/SignUp_alumno";
import Login from "./pages/Login";
import Profesor from "./pages/Profesor";
import InfoCurso from "./pages/InfoCurso";
import Calendario from "./components/Calendario/Calendario";
import Admini from "./pages/Admini";
import Apoderado from "./pages/Apoderado";
import Contact from "./components/Contact";
import Informacion_util from"./pages/Informacion_util";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { auth } from "./AuthContext";
import { getDatabase } from "firebase/database"; // Firebase v9+
import { getFirestore } from "firebase/firestore";
import {
  AuthProvider,
  DatabaseProvider,
  FirestoreProvider,
  useFirebaseApp,
} from "reactfire";

function App() {
  const app = useFirebaseApp(); // a parent element contains a `FirebaseAppProvider`

  // initialize Database and Auth with the normal Firebase SDK functions
  const database = getDatabase(app);
  const firestore = getFirestore(app);

  return (
    <FirestoreProvider sdk={firestore}>
      <AuthProvider sdk={auth}>
        <DatabaseProvider sdk={database}>
          <Router>
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admini" element={<Admini />} />
                <Route path="/admini/signup-profesor" element={<SignUp />} />
                <Route
                  path="/admini/signup-alumno"
                  element={<SignUp_alumno />}
                />
                <Route
                  path="/admini/signup-apoderado"
                  element={<SignUp_apoderado />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/profesor" element={<Profesor />} />
                <Route path="/cursos/:id" element={<InfoCurso />} />
                <Route path="/Apoderado" element={<Apoderado />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/informacion_util" element={<Informacion_util />} />
                {/* <Route path="/products" element={<Products />} />
                <Route path="/products/product1" element={<Product1 />} />
                <Route path="/products/product2" element={<Product2 />} />
                <Route path="/products/product3" element={<Product3 />} />
                <Route path="/products/:id" element={<DynamicPage />} /> */}
              </Routes>
            </div>
          </Router>
        </DatabaseProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
}

export default App;
