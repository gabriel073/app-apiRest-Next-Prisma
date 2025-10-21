import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/libs/prisma";


const handler = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                usuario: {
                    label: "Usuario",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                const usuario = await prisma.usuario.findUnique({
                    where: {
                        usuario: credentials.usuario
                    }
                });
                if (!usuario) throw new Error("No existe el usuario")

                const passwordMatch = await bcrypt.compare(credentials.password, usuario.password)
                if (!passwordMatch) throw new Error(
                    {
                        message: "Contraseña incorrecta",
                        ok: false
                    });

                return {
                    id: usuario.id,
                    usuario: usuario.usuario,
                    email: usuario.email,
                }
            }
        }),
    ],
    pages: {
        signIn: "/login",
    },
});
export { handler as GET, handler as POST };