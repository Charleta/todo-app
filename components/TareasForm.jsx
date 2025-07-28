import { useState } from "react";

export default function TareasForm({ agregar }) {
  const [tarea, setTarea] = useState("");
  const [categoria, setCategoria] = useState("categoria");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tarea.trim() === "") return;
    console.log(tarea);
    agregar(tarea, categoria);
    setTarea("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese la tarea"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
        />
        <select name="categoria" onChange={(e) => setCategoria(e.target.value)}>
          <option value="trabajo">Trabajo</option>
          <option value="estudio">Estudio</option>
          <option value="hogar">Hogar</option>
          <option value="otros">Otros</option>
        </select>
        <button type="submit">Agregar</button>
      </form>
    </>
  );
}
