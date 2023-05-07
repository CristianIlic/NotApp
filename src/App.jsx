import Navbar from "./components/Navbar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Teacher from "./components/Teacher";
import InfoCurso from "./components/InfoCurso";
import Calendario from "./components/Calendario";
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
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`

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
                <Route path="/" Component={Home} />
                <Route path="/signup" Component={SignUp} />
                <Route path="/login" Component={Login} />
                <Route path="/teacher" Component={Teacher} />
                <Route path="/info-curso" Component={InfoCurso} />
                <Route path="/calendario" Component={Calendario} />
              </Routes>
            </div>
          </Router>
        </DatabaseProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
}

export default App;
