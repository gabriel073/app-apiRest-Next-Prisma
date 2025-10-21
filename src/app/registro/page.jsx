"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Registro() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const router = useRouter();
    const recogerForm = handleSubmit(async (data) => {
        if (data.password !== data.repeatPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const respuesta = fetch('/api/auth/registro', {
            method: 'POST',
            body: JSON.stringify(
                {
                    usuario: data.usuario,
                    email: data.email,
                    password: data.password
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!respuesta.ok) {
            alert("Usuario registrado correctamente")
            router.push("/api/auth/login")
        }

    })

    return (
        <div>
            <h1 className="text-2xl font-bold m-5 text-center">Registro de Usuario </h1>
            <div className="form-container border-2 border-black p-5 w-1/3 m-auto rounded-xl shadow-xl bg-blue-600">

                <form className="flex flex-col gap-3"
                    onSubmit={recogerForm}>
                    <label htmlFor="usuario">Nombre</label>
                    <input type="text" id="usuario" required placeholder="Usuario" className="border-2 border-cyan-950 rounded-xl p-1 bg-blue-300 text-black h-10"
                        {...register("usuario", {
                            required: {
                                value: true,
                                message: "El campo usuario es obligatorio"
                            }
                        })}
                    />
                    {
                        errors.usuario && (
                            <p className="text-red-500 mt-[-5px] ml-2">
                                {errors.usuario.message}
                            </p>
                        )
                    }

                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" required placeholder="Email" className="border-2 border-cyan-950 rounded-xl p-1 bg-blue-300 text-black h-10"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "El campo email es obligatorio"
                            }
                        })}
                    />
                    {
                        errors.email && (
                            <p className="text-red-500 mt-[-5px] ml-2">
                                {errors.email.message}
                            </p>
                        )
                    }

                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" required placeholder="*********" className="border-2 border-cyan-950 rounded-xl p-1 text-black bg-blue-300 h-10"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "El campo Contraseña es obligatorio"
                            }
                        })}
                    />
                    {
                        errors.password && (
                            <p className="text-red-500 mt-[-5px] ml-2">
                                {errors.password.message}
                            </p>
                        )
                    }

                    <label htmlFor="repeatPassword">Repetir Contraseña</label>
                    <input type="password" id="password" required placeholder="*********" className="border-2 border-cyan-950 rounded-xl p-1 text-black bg-blue-300 h-10"
                        {...register("repeatPassword", {
                            required: {
                                value: true,
                                message: "El campo Repetir Contraseña es obligatorio"
                            }
                        })}
                    />
                    {
                        errors.repeatPassword && (
                            <p className="text-red-500 mt-[-5px] ml-2">
                                {errors.repeatPassword.message}
                            </p>
                        )
                    }

                    <div className="flex justify-around gap-5">
                        <input type="submit" value="Registrar" className="cursor-pointer border-2 border-cyan-950 hover:bg-blue-500 p-3 rounded-xl" />
                    </div>
                </form>
            </div>
        </div>
    )
}
Registro;