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
    <ul>
      {tareas.map((tarea) =>
      
        idTareaEditar === tarea.id ? (
          <form
            key={tarea.id}
            onSubmit={(e) => {
              e.preventDefault();
              editar(tarea.id, e.target.tarea.value);
            }}
          >
            <input type="text" name="tarea" defaultValue={tarea.tarea} />
            <button type="submit">Guardar</button>
          </form>
        ) : (
          <li key={tarea.id}>
            <span>{tarea.tarea}</span>
            <span>{tarea.categoria}</span>
            {tarea.completada ? (
              <span>Completado</span>
            ) : (
              <span>No completado</span>
            )}

            <Boton text="Estado" type={() => estadoTarea(tarea.id)} />
            <Boton text="Eliminar" type={() => eliminar(tarea.id)} />
            <Boton text="Editar" type={() => setIdTareaEditar(tarea.id)} />
          </li>
        )
      )}
    </ul>
  );
};
