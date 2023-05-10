import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Teacher from "./components/Teacher";
import InfoCurso from "./components/InfoCurso";
import Calendario from './components/Calendario';
import Admini from "./components/Admini";
import Alumno from "./components/Alumno";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { auth } from "./AuthContext";
import { getDatabase } from "firebase/database"; // Firebase v9+
import { getFirestore } from "firebase/firestore";
import {AuthProvider,DatabaseProvider,FirestoreProvider,useFirebaseApp,} from "reactfire";
import Apoderado from "./components/Apoderado";

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
            <Navbar />
            <div className="App">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Teacher" element={<Teacher />} />
                <Route path="/InfoCurso" element={<InfoCurso />} />
                <Route path="/Calendario" element={<Calendario />} />
                <Route path="/Admini" element={<Admini />} />
                <Route path="/Apoderado" element={<Apoderado />} />
                <Route path="/Alumno" element={<Alumno />} />
               
              </Routes>
            </div>
          </Router>
        </DatabaseProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
}

export default App;
