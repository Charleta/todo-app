import { Boton } from "./Boton";

export const ListaTareas = ({
  tareas,
  estadoTarea,
  eliminar,
  editar,
  setIdTareaEditar,
  idTareaEditar,
}) => {
  return (
    <div className="grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      
        {tareas.map((tarea) =>
          idTareaEditar === tarea.id ? (
            <form
              key={tarea.id}
              onSubmit={(e) => {
                e.preventDefault();
                editar(tarea.id, e.target.tarea.value);
              }}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
            >
              <input
                type="text"
                name="tarea"
                defaultValue={tarea.tarea}
                className="w-full p-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors mr-2"
              >
                Guardar
              </button>
            </form>
          ) : (
            <div
              key={tarea.id}
              className="bg-orange-100 border border-orange-200 rounded-xl p-4 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
            >
              <div className="mb-3">
                <span className="font-medium text-gray-800 block mb-1">
                  {tarea.tarea}
                </span>
                <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {tarea.categoria}
                </span>
              </div>

              <div className="mb-3">
                {tarea.completada ? (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                    Completado
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                    No completado
                  </span>
                )}
              </div>

              <div className="flex space-x-1 pt-2 border-t border-gray-200">
                <Boton text="Estado" type={() => estadoTarea(tarea.id)} />
                <Boton text="Eliminar" type={() => eliminar(tarea.id)} />
                <Boton text="Editar" type={() => setIdTareaEditar(tarea.id)} />
              </div>
            </div>
          )
        )}
      
    </div>
  );
};
