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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 px-4 py-4 w-full max-w-xs"
    >
      <label className="text-gray-900 font-medium">
        Filtrar por categoría:
      </label>
      <select
        name="buscar"
        onChange={(e) => setBusqueda(e.target.value)}
        className="px-4 py-2 bg-white/90 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
      >
        <option value="trabajo">Trabajo</option>
        <option value="estudio">Estudio</option>
        <option value="hogar">Hogar</option>
        <option value="otros">Otros</option>
      </select>

      <div>
        <Boton
          className="w-full md:w-60 px-6 py-2 bg-blue-500 text-gray-900 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          text="Buscar"
        />
      </div>
    </form>
  );
};