import { useState } from "react";
import Container from "../components/Container";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const ERRORS = {
        //mensajeErrorFirebase: "mensajequequeremosmostrar"
        "auth/user-not-found":
          "Usuario no encontrado, verifique sus datos por favor",
        "auth/wrong-password": "La contraseña incorrecta, verifiquela por favor",
        "auth/invalid-email":
          "El correo indicado es inválido, verifique sus datos por favor",
        "auth/missing-password": "La contraseña esta vacia, indiquela por favor",
        "auth/invalid-credential":
          "Credenciales inválidas, verifique sus datos por favor",
        "auth/network-request-failed":
          "Error de red, verifique su conexión a internet",
    };
    
    const notify = (msg) => toast(msg);

    const startLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(userCredential);
        } catch (error) {
            console.log("Error", error.code);
            notify(ERRORS[error.code]);
            throw error;
        }
    };
    
    const handleLogin = () => {
        toast.promise(startLogin(), {
            pending: 'Validacion en progreso...',
            success: 'Login exitoso 👍',
            error: 'Error al ingresar en cuenta del usuario 🤯'
        });

        setTimeout(() => {
            navigate('/products');
        }, 3000);
    };

    return (
      <div className="bg-blue-100 min-h-screen">
        <Container>
            <div className="lg:w-2/6 md:w-1/2 bg-gray-400 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-8 md:mt-10 mx-auto">
                <h2 className="text-dark text-lg font-medium title-font mb-5">
                    Ingrese sus datos de usuario
                </h2>
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-700">
                        Correo electrónico:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-white focus:ring-2 focus:ring-blue-600 rounded border border-gray-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ej. ejemplo@gmail.com"
                    />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full bg-white focus:ring-2 focus:ring-blue-700 rounded border border-gray-600 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ej. 8161csda188sd@"
                    />
                </div>
                <button
                    className="text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg"
                    onClick={handleLogin}
                >
                    Iniciar Sesión
                </button>
                <p className="text-xs mt-3">
                    *La contraseña debe ser de al menos 6 caracteres.
                </p>
                <p className="text-sm mt-3 text-center">
                    ¿No posees una cuenta? Cree una cuenta nueva <a href="/register" className="text-blue-500">aquí</a>
                </p>
            </div>
            <ToastContainer />
        </Container>
        </div>
    )
}
