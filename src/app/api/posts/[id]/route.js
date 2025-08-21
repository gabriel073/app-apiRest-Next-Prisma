import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";

export async function GET(request, { params }) {
    const { id } = await params;
    const post = await prisma.post.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    return NextResponse.json(post)
}



export async function PUT(request, { params }) {
    const { id } = await params;
    const datos = await request.json()
    const postAct = await prisma.post.update({
        where: {
            id: parseInt(id)
        },
        data: {
            ...datos
        }
    })

    return NextResponse.json(postAct, { status: 200 })
}


export async function DELETE(request, { params }) {
    const { id } = await params;
    try {
        const postDel = await prisma.post.delete({
            where: {
                id: parseInt(id)
            }
        })
        return NextResponse.json(postDel, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

}