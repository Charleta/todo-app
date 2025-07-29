import { useState } from "react";
import { Boton } from "./Boton"

export const Buscar = ({ tareas, setTareasFiltradas }) => {
  const [busqueda, setBusqueda] = useState("trabajo");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(busqueda);
    const busquedaTarea = tareas.filter((tarea) =>
      tarea.categoria.toLowerCase().includes(busqueda.toLowerCase())
    );
    console.log(busquedaTarea);
    setTareasFiltradas(busquedaTarea);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <span className="text-gray-900 font-medium">Filtrar por categoría:</span>
      <select
        name="buscar"
        onChange={(e) => setBusqueda(e.target.value)}
        className="px-3 py-2 bg-white/90 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
      >
        <option value="trabajo">Trabajo</option>
        <option value="estudio">Estudio</option>
        <option value="hogar">Hogar</option>
        <option value="otros">Otros</option>
      </select>

      <Boton text="Buscar" />
    </form>
  );
};