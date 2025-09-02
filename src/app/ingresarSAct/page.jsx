import { redirect } from 'next/navigation';
import prisma from '../libs/prisma';
import { NextResponse } from 'next/server';


const IngresarSAct = () => {
    const recogerForm = async (datos) => {
        "use server";
        const titulo = datos.get('titulo')
        const contenido = datos.get('contenido')

        if (titulo === "" || contenido === "") {
            return
        }

        // try {
        //     const respuesta = await fetch(`http://localhost:3000/api/posts`, {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             titulo,
        //             contenido
        //         }),
        //     });
        //     const datos = await respuesta.json();

        // } catch (error) {
        //     console.error("Error:", error)
        // } finally {
        //     redirect('/posts')
        // }

        const nuevoPost = await prisma.post.create({
            data: {
                titulo: titulo,
                contenido: contenido
            }
        })
        redirect('/posts')
        // return NextResponse.json(nuevoPost, { status: 201 })

    }
    return (
        <>
            <h1 className="text-2xl font-bold m-5 text-center">Ingresar Nuevo Post</h1>
            <div className="flex flex-col items-center justify-center">
                <form className="p-5 bg-red-700 rounded-lg shadow-lg w-1/4 m-auto" action={recogerForm}>
                    <input
                        type="text"
                        placeholder="Titulo del Post"
                        id="titulo"
                        className="p-2 rounded-lg w-full border-2 border-gray-300 mb-3"
                        name='titulo'
                    />
                    <textarea
                        placeholder="Realiza la descripcion"
                        rows={3}
                        className="p-2 rounded-lg w-full border-2 border-gray-300 mb-3"
                        id="contenido"
                        name='contenido'
                    />
                    <input
                        type="submit"
                        className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-400 border-2 border-gray-300 "
                        value="Ingresar"
                    />

                </form>
            </div >
        </>
    )


}
export default IngresarSAct;