import { useState, useEffect } from "react";
import {
  useFirestore,
  useAuth,
  useFirestoreDocData,
  useFirestoreCollection,
  useFirestoreCollectionData,
} from "reactfire";
import {
  collection,
  getFirestore,
  setDoc,
  doc,
  writeBatch,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function useNotifications() {
  const {
    currentUser: { uid },
  } = useAuth();

  const db = getFirestore();
  // set up query
  const firestore = useFirestore();
  const notificacionesCollection = collection(firestore, "notificaciones");
  const notificacionesQuery = query(
    notificacionesCollection,
    where("dirigidoA", "==", uid)
  );

  const { data: notificaciones, status: statusNotificaciones } =
    useFirestoreCollectionData(notificacionesQuery);

  const sendNotification = async (content) => {
    try {
      if (Array.isArray(content)) {
        const batch = writeBatch(db);

        for (const item of content) {
          const { contenido, sufferedChangeIds } = item;

          const usersQuery = query(
            collection(db, "usuario"),
            where("alumnos", "array-contains", sufferedChangeIds)
          );

          const dirigidoA = await getDocs(usersQuery);

          dirigidoA.forEach(({ id }) => {
            const notificacionesRef2 = doc(db, "notificaciones", uuidv4());
            batch.set(notificacionesRef2, {
              contenido,
              dirigidoA: id,
              enviadoPor: uid,
              leido: false,
            });
          });
        }

        await batch.commit();
      } else if (typeof content === "object") {
        const { contenido, sendTo, sufferedChangeIds } = content;

        let dirigidoA;

        if (!sendTo) {
          const usersQuery = query(
            collection(db, "usuario"),
            where("alumnos", "in", sufferedChangeIds)
          );

          dirigidoA = await getDocs(usersQuery);
        } else {
          dirigidoA = sendTo;
        }

        await addDoc(collection(db, "notificaciones"), {
          dirigidoA,
          contenido,
          enviadoPor: uid,
          leido: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (ids) => {
    try {
      const batch = writeBatch(db);

      for (const item of ids) {
        const notificacionRef = doc(db, "notificaciones", item);
        batch.update(notificacionRef, { leido: true });
      }

      batch.commit();
    } catch (error) {
      console.log(error);
    }
  };

  return { statusNotificaciones, notificaciones, sendNotification, markAsRead };
}
