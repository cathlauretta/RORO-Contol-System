import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/../prisma/client';
import { compare } from 'bcrypt';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            
            async authorize(credentials)  {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                const existingUser = await prisma.employee.findUnique ({
                    where: {
                        username: credentials?.username
                    }
                })

                if (!existingUser) {
                    return null;
                }

                const checkPass = await compare(credentials.password, existingUser.password);

                if (!checkPass) {
                    return null;
                }

                return {
                    id: existingUser.employee_id,
                    name: existingUser.name,
                    username: existingUser.username,
                    role: existingUser.role
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    role: user.role
                }
            }
            return token
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    name: token.name,
                    username: token.username,
                    role: token.role
                }
            }
        }
    }
}