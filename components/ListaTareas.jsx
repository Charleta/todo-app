import { Boton } from "./Boton";



    


const eliminarTarea = () => {
  console.log("Tarea eliminada");
};

export const ListaTareas = ({ tareas , estadoTarea}) => {
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

          <Boton text="Estado" type={()=>estadoTarea(tarea.id)} />
          <Boton text="Eliminar" type={eliminarTarea} />
        </li>
      ))}
    </ul>
  );
};
