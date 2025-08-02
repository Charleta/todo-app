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
      <form onSubmit={handleSubmit} className="flex flex-col  md:flex-row items-center justify-center space-y-4 space-x-4">
        <div>
        <span className="text-gray-900 font-medium">Nueva tarea:</span>
        <input
          type="text"
          placeholder="Ingrese la tarea"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          className="flex-1 px-4 py-2 bg-white/90 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
        />
        <select
          name="categoria"
          onChange={(e) => setCategoria(e.target.value)}
          className="px-3 py-2 bg-white/90 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        >
          <option value="trabajo">Trabajo</option>
          <option value="estudio">Estudio</option>
          <option value="hogar">Hogar</option>
          <option value="otros">Otros</option>
        </select>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-green-500 text-gray-900 rounded-lg hover:bg-green-600 transition-colors font-medium"
        >
          Agregar
        </button>
      </form>
    </>
  );
}
