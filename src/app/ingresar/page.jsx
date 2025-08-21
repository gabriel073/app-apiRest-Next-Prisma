"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';


function Ingresar(props) {
    const router = useRouter();
    const [titulo, setTitulo] = useState(props.edit ? props.post.titulo : "");
    const [contenido, setContenido] = useState(props.edit ? props.post.contenido : "");


    const handlerForm = async (e) => {
        e.preventDefault()
        const titulo = e.target.titulo.value;
        const contenido = e.target.contenido.value;

        if (titulo === "" || contenido === "") {
            return
        }
        if (props.edit) {
            try {
                const respuesta = await fetch(`/api/posts/${props.post.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        titulo,
                        contenido
                    }),
                });
                const data = await respuesta.json();
                router.push("/posts")
            } catch (error) {
                console.error("Error:", error)
            }
            return;
        }


        try {
            const respuesta = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo,
                    contenido
                }),
            });
            const data = await respuesta.json();
            router.push("/posts")
        } catch (error) {
            console.error("Error:", error)
        }
    }

    const handleDelete = async () => {
        try {
            const respuesta = await fetch(`/api/posts/${props.post.id}`, {
                method: 'DELETE',
            });
            const data = await respuesta.json();
            router.push("/posts")
        } catch (error) {
            console.error("Error:", error)
        }
    }


    return (
        <>
            <h1 className="text-2xl font-bold m-5 text-center">{props.edit ? "Editar Post" : "Ingresar Nuevo Post"}</h1>
            <div className="flex flex-col items-center justify-center">
                <form className="p-5 bg-red-700 rounded-lg shadow-lg w-1/4 m-auto" onSubmit={handlerForm}>
                    <input
                        type="text"
                        placeholder="Nombre"
                        id="titulo"
                        className="p-2 rounded-lg w-full border-2 border-gray-300 mb-3"
                        defaultValue={titulo}
                    />
                    <textarea
                        placeholder="Realiza la descripcion"
                        rows={3}
                        className="p-2 rounded-lg w-full border-2 border-gray-300 mb-3"
                        id="contenido"
                        defaultValue={contenido}
                    />
                    <input
                        type="submit"
                        className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-400 border-2 border-gray-300 "
                        value={props.edit ? "Editar" : "Ingresar"}
                    />
                    {props.edit && (
                        <button
                            type="button"
                            className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-400 border-2 border-gray-300 ml-3"
                            onClick={handleDelete}
                        >
                            Borrar
                        </button>
                    )}
                </form>
            </div>
        </>
    )
}

export default Ingresar;