
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
    try {
        const datos = await request.json()
        const usuario = await prisma.usuario.findUnique({
            where: {
                usuario: datos.usuario
            },

        });
        if (usuario) {
            return NextResponse.json({
                error: "El usuario ya existe"
            }, { status: 400 });
        }
        const email = await prisma.usuario.findUnique({
            where: {
                email: datos.email
            },
        });
        if (email) {
            return NextResponse.json({ error: "El email ya existe" }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(datos.password, 10);
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                usuario: datos.usuario,
                email: datos.email,
                password: passwordHash
            }
        });
        const { password: _, ...user } = nuevoUsuario;
        return NextResponse.json(user);

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
