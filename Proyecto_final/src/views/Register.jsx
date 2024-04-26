import { useState } from "react";
import Container from "../components/Container";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const startRegister = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          console.log(userCredential);
        } catch (error) {
          console.log("Error", error);
          throw error
        }
      };
    
      const handleRegister = () => {
        toast.promise(startRegister(), {
          pending: 'Registro en progreso...',
          success: 'Registro exitoso 👍',
          error: 'Error en el registro del usuario 🤯'
        })
      }


    return (
      <div className="bg-green-100 min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="lg:w-1/3 md:w-1/2 bg-gray-400 bg-opacity-50 rounded-lg p-4 flex flex-col md:mr-auto w-full mt-8 md:mt-10 mx-auto">
            <h2 className="text-dark text-lg font-medium title-font mb-3">
              Registra una cuenta nueva
            </h2>
            <div className="relative mb-2">
              <label htmlFor="email" className="leading-7 text-sm text-gray-700">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white focus:ring-2 focus:ring-blue-600 rounded border border-gray-600 text-base outline-none py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ej. ejemplo@gmail.com"
              />
            </div>
            <div className="relative mb-2">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full bg-white focus:ring-2 focus:ring-blue-700 rounded border border-gray-600 text-base outline-none py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ej. 8161csda188sd@"
              />
            </div>
            <button
              className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
              onClick={handleRegister}
            >
              Registrarse
            </button>
            <p className="text-xs mt-2">
              *La contraseña debe ser de al menos 6 caracteres.
            </p>
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-gray-300 bg-opacity-50 rounded-lg p-4 flex flex-col md:ml-auto w-full mt-8 md:mt-10 mx-auto">
            <h2 className="text-dark text-lg font-medium title-font mb-3">
              ¡Únete a nosotros hoy mismo!
            </h2>
            <p className="leading-relaxed mb-3">
              Regístrate para obtener una cuenta y disfruta de todos nuestros servicios y beneficios exclusivos.
            </p>
            <p className="text-xs">
              ¿Ya tienes una cuenta? <a href="/login" className="text-blue-500">Inicia sesión aquí</a>
            </p>
          </div>
        </div>
        <ToastContainer />
      </Container>
      </div>
    )
}
