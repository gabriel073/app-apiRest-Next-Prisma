import Link from 'next/link';
import React from 'react'

function notfound() {
    return (
        <div className='flex flex-col items-center justify-center  mt-10 '>
            <h1 className='text-4xl'>Donde vas???,  pagina no encontrada </h1>
            <Link className='text-3xl hover:underline hover:text-blue-400' href="/" >Volver al Home </Link>

        </div>
    )
}

export default notfound;