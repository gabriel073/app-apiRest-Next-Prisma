import Link from 'next/link';
import React from 'react'
const { signOut } = require("next-auth/react")


const cargarPosts = async () => {
    const respuesta = await fetch('http://localhost:3000/posts');
    const data = await respuesta.json()
    return data;
}

const Posts = async () => {
    const listaPosts = await cargarPosts();
    return (
        <div className=" ">
            <h1 className="text-2xl font-bold m-5 text-center">Posts</h1>
            <ul className="flex flex-col gap-5">
                {listaPosts.map((post) => {
                    return (
                        <Link href={`/editarParams?id=${post.id}&titulo=${post.titulo}&contenido=${post.contenido}`} key={post.id}>
                            <li className=" bg-gray-100 p-5 rounded-lg shadow-lg w-1/2">
                                <h2 className="text-2xl font-bold text-black">{post.titulo}</h2>
                                <p className="text-gray-500">{post.contenido}</p>
                            </li>
                        </Link>
                    );
                })}
                <div className=" bg-red-500 hover:bg-red-300 p-5 rounded-lg shadow-lg w-1/2">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>Cerrar Sesion</button>
                </div>
            </ul>
        </div>
    )
}

export default Posts;