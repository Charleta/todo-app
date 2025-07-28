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
    <form onSubmit={handleSubmit}>
      <select name="buscar" onChange={(e) => setBusqueda(e.target.value)}>
        <option value="trabajo">Trabajo</option>
        <option value="estudio">Estudio</option>
        <option value="hogar">Hogar</option>
        <option value="otros">Otros</option>
      </select>

      <Boton text="Buscar" />
    </form>
  );
};