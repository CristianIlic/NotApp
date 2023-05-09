import {
    Box,
    Button,
    Link,
  } from "@chakra-ui/react";
  import { EditIcon } from "@chakra-ui/icons"
  import ModalEdit from "./ModalEdit";
  import { initializeApp } from "firebase/app";
  import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
  } from "firebase/firestore";
  import firebaseConfig from "../firebase-config";
  
  initializeApp(firebaseConfig);
  
  //iniciar servicios
  const db = getFirestore();
  
  //referencia a la coleccion
  const colRef = collection(db, "alumnos");
  
  // queries
  
  const q = query(colRef, orderBy("apellidos"));
  
  //data de la coleccion en tiempo real
  
  const alumnos = [];
  
  onSnapshot(q, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      alumnos.push({ ...doc.data(), id: doc.id });
    });
    console.log(alumnos);
  });
  
  const Admini = () => {
    return (
      <div>
        <div className="body-admini">
          <h1>Administración</h1>
          <Link href="/signup">
          <Button
          size="lg"
          bg="primary"
          color="white">
            <EditIcon />
            Registro
          </Button>
          </Link>
        </div>
      </div>
    );
  };
  
  export default Admini;
  