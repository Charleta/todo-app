import TareasForm from "@/components/TareasForm";
import { useState, useEffect } from "react";
import { ListaTareas } from "@/components/ListaTareas";
import { Boton } from "@/components/Boton";
import { db } from "@/services/firebaseConfig";
import { getAuth ,createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  
} from "firebase/firestore";
import { Buscar } from "@/components/Buscar";
import { SkeletonLoading } from "@/components/SkeletonLoading";
import { Login } from "@/components/Login";

export default function Home() {
  const [tareas, setTareas] = useState([]);
  const [idTareaEditar, setIdTareaEditar] = useState(null);
  const [tareasFiltradas, setTareasFiltradas] = useState ([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTareas = async () => {
      try {const querySnapshot = await getDocs(collection(db, "tareas"));
      console.log(querySnapshot.docs);
      const tareasData = querySnapshot.docs.map((doc) =>{
        return { id: doc.id, ...doc.data() };
      })
    setTareas(tareasData);
      setLoading(false);
    } catch (error){
      console.log(error)
    }
      
      
      ;
    };
   
    fetchTareas();
    
  },[]);

  const agregarTarea = async (tarea, categoria) => {
    // console.log("Tarea agregada:", nuevaTarea);
    try {
      const docRef = await addDoc(collection(db, "tareas"), {
        tarea: tarea,
        categoria: categoria,
        completada: false,
      });

      const nuevaTarea = {
        id: docRef.id,
        categoria: categoria,
        tarea,
        completada: false,
      };
      setTareas([...tareas, nuevaTarea]);
      console.log("Tarea guardada en Firestore con ID:", docRef.id);
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
    }
  };

  const estadoTarea = async (id) => {
    const tareasActualizadas = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    );

    setTareas(tareasActualizadas);

    const tareaActualizada = tareasActualizadas.find(
      (tarea) => tarea.id === id
    );
    const ref = doc(db, "tareas", id);
    await updateDoc(ref, {
      completada: tareaActualizada.completada,
    });
  };

  const eliminarTarea = async (id) => {
    const tareasActualizadas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(tareasActualizadas);

    const ref= doc(db, "tareas", id);
    await deleteDoc(ref);

  };

  const editarTarea = async (id, nuevaTarea) => {
    const tareaNueva = tareas.map((tarea) =>
      tarea.id === id ? { ...tarea, tarea: nuevaTarea } : tarea
    );
    setTareas(tareaNueva);
    const ref = doc(db, "tareas", id);
    await updateDoc(ref, {
      tarea: nuevaTarea,
    });
    setIdTareaEditar(null);
  };

  const [email, setEmail] = useState("");
  const [passwoard, setPasswoard] = useState("");
  const newUser = async (e) =>{
    e.preventDefault();
   
       const auth= getAuth();
       try {
        const userCREDENTIAL = await createUserWithEmailAndPassword(auth, email , passwoard)
        const user = userCREDENTIAL.user;
       } catch (error) {
    console.error("Error al crear usuario:", error);
    setEmail("");
    setPasswoard("")
    // Manejo de errores, por ejemplo, mostrar un mensaje al usuario
  }
  
}


 
  
  
 
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-200 to-teal-200 ">
      <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100  ">
        <div className=" flex justify-between bg-white/10 backdrop-blur-sm border-b border-white/20 p-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 text-center">
              Administrador de Tareas
            </h1>
          </div>
          <div>
            <Boton
              className="bg-yellow-100 hover:-translate-y-1 hover:bg-yellow-400 transition-all hover:shadow-2xl p-2 rounded-lg shadow-lg "
              text="Ingresar"
            />
            <Boton
              className="bg-yellow-100 hover:-translate-y-1 transition-all hover:shadow-2xl hover:bg-yellow-400 p-2 rounded-lg shadow-sm mx-2"
              text="Crear cuenta"
            />
          </div>
        </div>{" "}
        <div className="mb-8 space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <TareasForm agregar={agregarTarea} />
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white/10 backdrop-blur-sm rounded border-b-green-500 p-4 border border-white/20">
            <Buscar tareas={tareas} setTareasFiltradas={setTareasFiltradas} />

            <Boton
              className="w-full md:w-auto px-6 py-2 bg-blue-500 text-gray-900 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              type={() => setTareasFiltradas([])}
              text="Todas las tareas"
            />
          </div>
        </div>
        {/* <TareasForm agregar={agregarTarea} /> */}
        {/* <Buscar tareas={tareas} setTareasFiltradas={setTareasFiltradas} /> */}
        {loading ?  (<SkeletonLoading/>) : (<div className="bg-transparent backdrop-blur-sm rounded-xl  shadow-lg border border-white/20 ">
          <div className="p-4">
            <ListaTareas
              tareas={tareasFiltradas.length > 0 ? tareasFiltradas : tareas}
              estadoTarea={estadoTarea}
              eliminar={eliminarTarea}
              editar={editarTarea}
              idTareaEditar={idTareaEditar}
              setIdTareaEditar={setIdTareaEditar}
            />
          </div>
        </div>) }
        
      </div>
      {/* <div>
        <Login
          newUser={newUser}
          setEmail={setEmail}
          setPasswoard={setPasswoard}
        />
      </div> */}
    </div>
  );
}
