"use client";
import { useRouter } from "next/navigation";

const Registro = () => {
    const router = useRouter();
    const recogerForm = async (e) => {
        e.preventDefault()
        const usuario = e.target.usuario.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        if (!usuario || !email || !password) {
            alert("Faltan campos por llenar")
            return;
        }

        const respuesta = await fetch('/api/usuarios/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario,
                email,
                password
            }),
        });
        if (respuesta.ok) {
            alert("Usuario registrado correctamente")
            router.push("/login")
            const datos = await respuesta.json();
        }

    }
    return (
        <div>
            <h1 className="text-2xl font-bold m-5 text-center">Registro de Usuario </h1>
            <div className="form-container border-2 border-black p-5 w-1/4 m-auto rounded-xl shadow-xl bg-blue-600">
                <form className="flex flex-col gap-3 " onSubmit={recogerForm}>
                    <label >Nombre</label>
                    <input type="text" id="usuario" required placeholder="Usuario" className="border-2 border-cyan-950 rounded-xl p-1 bg-blue-300 text-black" />
                    <label>Email</label>
                    <input type="text" id="email" required placeholder="Email" className="border-2 border-cyan-950 rounded-xl p-1 bg-blue-300 text-black" />
                    <label>Contraseña</label>
                    <input type="password" id="password" required placeholder="Password" className="border-2 border-cyan-950 rounded-xl p-1 text-black bg-blue-300" />
                    <div className="flex justify-around gap-5">
                        {/* <input type="submit" value="Ingresar" className="cursor-pointer border-2 border-cyan-950 hover:bg-blue-500 p-3 rounded-xl" /> */}
                        <input type="submit" value="Registrar" className="cursor-pointer border-2 border-cyan-950 hover:bg-blue-500 p-3 rounded-xl" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Registro;