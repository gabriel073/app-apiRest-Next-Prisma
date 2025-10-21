import Ingresar from '@/app/ingresar/page';
import React from 'react'

const CargarUnPost = async (id) => {
    const respuesta = await fetch(`${baseUrl}/api/posts/${id}`);
    const data = await respuesta.json()
    return data;
}

const PostEdit = async ({ params }) => {
    const { id } = params;
    const post = await CargarUnPost(id);


    return (
        <div className=" mt-10">
            <div className="border-b-2 border-gray-300 mb-5 p-5 bg-red-700 rounded-lg shadow-lg w-1/2 m-auto">
                <h1 className="text-2xl font-bold m-5 text-center underline">{post.titulo}</h1>
                <p className="text-2xl font-bold m-5 text-center">{post.contenido}</p>
            </div>
            <Ingresar edit={true} post={{ titulo: post.titulo, contenido: post.contenido, id: post.id }} />
        </div>


    )
}

export default PostEdit;