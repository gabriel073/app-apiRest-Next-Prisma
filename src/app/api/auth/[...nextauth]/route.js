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
            async authorize(credentials) {
                const usuario = await prisma.usuario.findUnique({
                    where: {
                        usuario: credentials.usuario
                    }
                });
                if (!usuario) {
                    return null
                }
                const passwordMatch = await bcrypt.compare(credentials.password, usuario.password)
                if (!passwordMatch) {
                    return null
                }
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