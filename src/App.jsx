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
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";

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
import Navbar from "./components/Navbar";

function App() {
  const app = useFirebaseApp(); // a parent element contains a `FirebaseAppProvider`

  // initialize Database and Auth with the normal Firebase SDK functions
  const database = getDatabase(app);
  const firestore = getFirestore(app);

  const Layout = () => (
    <>
      <Navbar Outlet={Outlet} />
    </>
  );

  const router = createBrowserRouter([
    // public routes
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/recover_password",
      element: <RecoverPassword />,
    },
    //private routes
    {
      path: "/admini",
      element: <Layout />,
      children: [
        {
          path: "/admini",
          element: <Admini />,
        },
      ],
    },
    {
      path: "/admini/signup-profesor",
      element: <Layout />,
      children: [
        {
          path: "/admini/signup-profesor",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "/admini/signup-alumno",
      element: <Layout />,
      children: [
        {
          path: "/admini/signup-alumno",
          element: <SignUp_alumno />,
        },
      ],
    },
    {
      path: "/admini/signup-apoderado",
      element: <Layout />,
      children: [
        {
          path: "/admini/signup-apoderado",
          element: <SignUp_apoderado />,
        },
      ],
    },
    {
      path: "/calendario",
      element: <Layout />,
      children: [
        {
          path: "/calendario",
          element: <Calendario />,
        },
      ],
    },
    {
      path: "/profesor",
      element: <Layout />,
      children: [
        {
          path: "/profesor",
          element: <Profesor />,
        },
      ],
    },
    {
      path: "/cursos/:id",
      element: <Layout />,
      children: [
        {
          path: "/cursos/:id",
          element: <InfoCurso />,
        },
      ],
    },
    {
      path: "/Apoderado",
      element: <Layout />,
      children: [
        {
          path: "/Apoderado",
          element: <Apoderado />,
        },
      ],
    },
    {
      path: "/Informacion_util",
      element: <Layout />,
      children: [
        {
          path: "/Informacion_util",
          element: <Informacion_util />,
        },
      ],
    },
    {
      path: "/contacto",
      element: <Layout />,
      children: [
        {
          path: "/contacto",
          element: <Contact />,
        },
      ],
    },
  ]);

  return (
    <FirestoreProvider sdk={firestore}>
      <AuthProvider sdk={auth}>
        <DatabaseProvider sdk={database}>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </DatabaseProvider>
      </AuthProvider>
    </FirestoreProvider>
  );
}

export default App;
