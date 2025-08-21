import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";


export async function GET() {
    try {
        const posts = await prisma.post.findMany()  // 👈 importante el await
        return Response.json(posts, { status: 200 })
    } catch (error) {
        console.error("Error fetching posts:", error)
        return Response.json({ error: error.message }, { status: 500 })
    }
}


export async function POST(request) {

    const datos = await request.json()
    const nuevoPost = await prisma.post.create({
        data: {
            titulo: datos.titulo,
            contenido: datos.contenido
        }
    })
    return NextResponse.json(nuevoPost, { status: 201 })
}



