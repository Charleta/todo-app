import TareasForm from "@/components/TareasForm";
import { useState, useEffect } from "react";
import { ListaTareas } from "@/components/ListaTareas";
import { db } from "@/services/firebaseConfig";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import { Buscar } from "@/components/Buscar";

export default function Home() {
  const [tareas, setTareas] = useState([]);
  const [idTareaEditar, setIdTareaEditar] = useState(null);
  const [tareasFiltradas, setTareasFiltradas] = useState ([])

  useEffect(() => {
    const fetchTareas = async () => {
      const querySnapshot = await getDocs(collection(db, "tareas"));
      console.log(querySnapshot.docs);
      const tareasData = querySnapshot.docs.map((doc) =>{
        return { id: doc.id, ...doc.data() };
      })
      setTareas(tareasData);
      ;
    };
   
    fetchTareas();
  },[setTareas]);

  const agregarTarea = async (tarea, categoria) => {
    // console.log("Tarea agregada:", nuevaTarea);
    try {
      const docRef = await addDoc(collection(db, "tareas"), {
        tarea: tarea,
        categoria: categoria,
        completada: false,
      });

      const nuevaTarea = {
        id: docRef.id,
        categoria: categoria,
        tarea,
        completada: false,
      };
      setTareas([...tareas, nuevaTarea]);
      console.log("Tarea guardada en Firestore con ID:", docRef.id);
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  const estadoTarea = async (id) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );

    setTareas(tareasActualizadas);

    const tareaActualizada = tareasActualizadas.find(
      (tarea) => tarea.id === id
    );
    const ref = doc(db, "tareas", id);
    await updateDoc(ref, {
      completada: tareaActualizada.completada,
    });
  };

  const eliminarTarea = async (id) => {
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasActualizadas);

    const ref= doc(db, "tareas", id);
    await deleteDoc(ref);

  };

  const editarTarea = async (id, nuevaTarea) => {
    const tareaNueva = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, tarea: nuevaTarea } : tarea
    );
    setTareas(tareaNueva);
    const ref = doc(db, "tareas", id);
    await updateDoc(ref, {
      tarea: nuevaTarea,
    });
    setIdTareaEditar(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Gestor de Tareas</h1>
      <TareasForm agregar={agregarTarea} />
      <Buscar tareas={tareas} setTareasFiltradas={setTareasFiltradas} />
      <ListaTareas
        tareas={tareasFiltradas.length > 0 ? tareasFiltradas : tareas}
        estadoTarea={estadoTarea}
        eliminar={eliminarTarea}
        editar={editarTarea}
        idTareaEditar={idTareaEditar}
        setIdTareaEditar={setIdTareaEditar}
      />
    </div>
  );
}
