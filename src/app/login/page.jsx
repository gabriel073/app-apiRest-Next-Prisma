"use client";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const recogerForm = async (e) => {
        e.preventDefault()
        const respuesta = await signIn('credentials', {
            redirect: false,
            usuario: e.target.usuario.value,
            // mail: e.target.mail.value,
            password: e.target.password.value
        });
        if (!respuesta.ok) {
            alert("Usuario o contraseña incorrectos");
            return;
        } else {
            router.push("/posts")
        }
        // if (usuario === "" || mail === "" || password === "") {
        //     alert("Faltan campos por llenar");
        //     return;
        // } else {
        //     router.push("/posts")
        // }
    }
    return (
        <div>
            <h1 className="text-2xl font-bold m-5 text-center">Login de Usuario </h1>
            <div className="form-container border-2 border-black p-5 w-1/4 m-auto rounded-xl shadow-xl bg-blue-600">
                <form className="flex flex-col gap-3 " onSubmit={recogerForm}>
                    <label htmlFor="usuario">Nombre</label>
                    <input type="text" id="usuario" required placeholder="Usuario" className="border-2 border-cyan-950 rounded-xl p-1 bg-blue-300 text-black" />
                    {/* <label htmlFor="mail">Email</label>
                        <input type="text" id="mail" required placeholder="Email" className="border-2 border-cyan-950 rounded-xl p-1 bg-blue-300 text-black" /> */}
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" required placeholder="Password" className="border-2 border-cyan-950 rounded-xl p-1 text-black bg-blue-300" />
                    <div className="flex justify-around gap-5">
                        {/* <input type="submit" value="Ingresar" className="cursor-pointer border-2 border-cyan-950 hover:bg-blue-500 p-3 rounded-xl" /> */}
                        <input type="submit" value="Entrar" className="cursor-pointer border-2 border-cyan-950 hover:bg-blue-500 p-3 rounded-xl" />
                    </div>
                </form>
            </div>
        </div>
    )

}
export default Login;