import Link from 'next/link';
import React, { Suspense } from 'react'
import Articulos from '../page';


const petRest = async (id) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products/' + id);
        const data = await response.json();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate a delay

        return data;

    } catch (error) {
        console.log(error);
    }
}

const Articulo = async ({ params }) => {
    const articulo = await petRest(params.articuloid);
    return (
        <>
            <h1 className='flex justify-center font-3xl mt-10'>Pagina de Articulos</h1>
            <Link href='/articulos' className='text-blue-500 ml-5 space-y-4'>Volver a Articulos</Link>
            <div className='mx-4 grid grid-cols-3 gap-7'>
                <div key={articulo.id} className='border-2 border-gray-300 rounded-lg p-4'>
                    <h2 className='text-xl font-bold'>{articulo.title}</h2>
                    <img src={articulo.image} alt={articulo.title} className='w-full h-48 object-cover mt-2' />
                    <p className='text-gray-500'>{articulo.description}</p>
                </div>

            </div>
            <Suspense fallback={<div>Cargando...</div>}>

                <Articulos />
            </Suspense>
        </>
    )
}

export default Articulo