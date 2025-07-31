import { Boton } from "./Boton"

export const Login = () => {

    return (
        <>
            <div>
                <form action="">
                    <input type="mail"
                    placeholder="Ingrese su mail"
                     />
                     <input type="text"
                     placeholder="Ingrese su contraseña"
                      />
                    <Boton text="Ingresar" />
                </form>
            </div>
        </>
    )

}