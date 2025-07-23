import { useState } from "react";


export default function TareasForm({ agregar }) {
  const [tarea, setTarea] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tarea.trim() === "") return;
    console.log(tarea);
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
        <button type="submit">Agregar</button>
      </form>
    </>
  );
}