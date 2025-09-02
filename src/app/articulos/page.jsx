import Link from 'next/link';
import React from 'react'


const petRest = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/');
        const data = await response.json();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate a delay

        return data;

    } catch (error) {
        console.log(error);
    }
}
const Articulos = async () => {
    const articulos = await petRest();
    return (
        <>
            <h1 className='flex justify-center font-3xl mt-10'>Pagina de Articulos</h1>
            <div className='mx-4 grid grid-cols-3 gap-7'>
                {articulos.map((articulo) => (
                    <Link href={`/articulos/${articulo.id}`} key={articulo.id}>
                        <div className='border-2 border-gray-300 rounded-lg p-4'>
                            <h2 className='text-xl font-bold'>{articulo.title}</h2>
                            <img src={articulo.image} alt={articulo.title} className='w-full h-48 object-cover mt-2' />
                            <p className='text-gray-500'>{articulo.description}</p>
                        </div>
                    </Link>
                ))}
            </div >

        </>
    )
}

export default Articulos;