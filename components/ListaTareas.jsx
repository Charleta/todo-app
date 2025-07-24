import { Boton } from "./Boton";

export const ListaTareas = ({ tareas, estadoTarea, eliminar }) => {
  return (
    <ul>
      {tareas.map((tarea) => (
        <li key={tarea.id}>
          <span>{tarea.tarea}</span>
          {tarea.completada ? (
            <span>Completado</span>
          ) : (
            <span>No completado</span>
          )}

          <Boton text="Estado" type={() => estadoTarea(tarea.id)} />
          <Boton text="Eliminar" type={() => eliminar(tarea.id)} />
        </li>
      ))}
    </ul>
  );
};
