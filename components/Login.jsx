import { Boton } from "./Boton"

export const Login = ({ newUser, setPasswoard, setEmail }) => {
  return (
    <>
      <div>
        <form onSubmit={newUser}>
          <input type="mail" 
          placeholder="Ingrese su mail" 
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input type="text" 
          placeholder="Ingrese su contraseña" 
          onChange={(e)=>setPasswoard(e.target.value)}
          />
          <Boton text="Ingresar" />
        </form>
      </div>
    </>
  );
};