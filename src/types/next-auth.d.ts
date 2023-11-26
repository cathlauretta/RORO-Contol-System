import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        name: string,
        username: string,
        role: string,
    }

    interface Session {
        user: User & {
            name: string
            username: string
            role: string
        }
        token: {
            name: string
            username: string
            role: string
        }
    }
}