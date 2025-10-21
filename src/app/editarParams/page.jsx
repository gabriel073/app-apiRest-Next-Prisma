"use client";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EditarParamsWrapper() {
    return (
        <Suspense fallback={<>Cargando...</>}>
            <EditarParams />
        </Suspense>
    );
}

function EditarParams() {
    const router = useRouter();
    const params = useSearchParams();

    const paramsId = params.get("id");
    const paramsTitulo = params.get("titulo");
    const paramsContenido = params.get("contenido");

    const handlerForm = async (e) => {
        e.preventDefault();
        const titulo = e.target.titulo.value;
        const contenido = e.target.contenido.value;

        if (titulo === "" || contenido === "") return;

        try {
            await fetch(`/api/posts/${paramsId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titulo, contenido }),
            });
            router.push("/posts");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            <h1 className="text-2xl font-bold m-5 text-center">Editar Post</h1>
            <div className="flex flex-col items-center justify-center">
                <form
                    className="p-5 bg-red-700 rounded-lg shadow-lg w-1/4 m-auto"
                    onSubmit={handlerForm}
                >
                    <input
                        type="text"
                        placeholder="Titulo del Post"
                        id="titulo"
                        className="p-2 rounded-lg w-full border-2 border-gray-300 mb-3"
                        defaultValue={paramsTitulo}
                    />
                    <textarea
                        placeholder="Realiza la descripcion"
                        rows={3}
                        className="p-2 rounded-lg w-full border-2 border-gray-300 mb-3"
                        id="contenido"
                        defaultValue={paramsContenido}
                    />
                    <input
                        type="submit"
                        className="p-2 rounded-xl bg-red-500 text-white hover:bg-red-400 border-2 border-gray-300"
                        value="Editar"
                    />
                </form>
            </div>
        </>
    );
}

export default EditarParamsWrapper;