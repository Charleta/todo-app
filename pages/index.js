import TareasForm from "@/components/TareasForm";
import { useState } from "react";
import { ListaTareas } from "@/components/ListaTareas";
import { db } from "@/services/firebaseConfig";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Home() {
  const [tareas, setTareas] = useState([]);
  const [idTareaEditar, setIdTareaEditar] = useState(null);

  const agregarTarea = async (tarea) => {
    // console.log("Tarea agregada:", nuevaTarea);
    try {
      const docRef = await addDoc(collection(db, "tareas"), {
        tarea: tarea,
        completada: false,
      });

      const nuevaTarea = {
        id: docRef.id,
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

  const eliminarTarea = (id) => {
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasActualizadas);
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
      <ListaTareas
        tareas={tareas}
        estadoTarea={estadoTarea}
        eliminar={eliminarTarea}
        editar={editarTarea}
        idTareaEditar={idTareaEditar}
        setIdTareaEditar={setIdTareaEditar}
      />
    </div>
  );
}
