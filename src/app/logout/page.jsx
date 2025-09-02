"use client"

const { signOut } = require("next-auth/react")

function Logout() {
    return (
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>Cerrar Sesion</button>
    )
}

export default Logout;