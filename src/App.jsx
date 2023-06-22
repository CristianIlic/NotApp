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
import RecoverPassword from "./pages/Recover_password";

function App() {
  const app = useFirebaseApp(); // a parent element contains a `FirebaseAppProvider`

  // initialize Database and Auth with the normal Firebase SDK functions
  const database = getDatabase(app);
  const firestore = getFirestore(app);

  return (
    <FirestoreProvider sdk={firestore}>
      <AuthProvider sdk={auth}>
        <DatabaseProvider sdk={database}>
          <div className="App">
            <Router>
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
                <Route path="/recover_password" element={<RecoverPassword />} />
              </Routes>
            </Router>
          </div>
        </DatabaseProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
}

export default App;
