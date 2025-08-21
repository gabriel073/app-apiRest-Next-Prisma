import Link from 'next/link';
import React from 'react'


const cargarPosts = async () => {
    const respuesta = await fetch('http://localhost:3000/api/posts')
    const data = await respuesta.json()
    return data;
}

const Posts = async () => {
    const listaPosts = await cargarPosts();
    return (
        <div className=" ">
            <h1 className="text-2xl font-bold m-5 text-center">Posts</h1>
            <ul className="flex flex-col gap-5">
                {listaPosts.map((post) => (
                    < Link href={`/posts/${post.id}`} key={post.id}>
                        <li className=" bg-gray-100 p-5 rounded-lg shadow-lg w-1/2">
                            <h2 className="text-2xl font-bold text-black">{post.titulo}</h2>
                            <p className="text-gray-500">{post.contenido}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>


    )
}

export default Posts;