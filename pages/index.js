import TareasForm from "@/components/TareasForm";
import { useState } from "react";

export default function Home() {


  const [tareas , setTareas] = useState([]);

  const agregarTarea = (tarea) =>{
    const nuevaTarea = {
      id: Date.now(),
      tarea,
      completada: false
    }
    setTareas([...tareas, nuevaTarea]);
    console.log("Tarea agregada:", nuevaTarea);

  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Gestor de Tareas</h1>
      <TareasForm agregar={agregarTarea} />
      
    </div>
  );
}
