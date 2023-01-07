/**
 * Authentication route using NextAuth
 * Prisma adapter provides type mapping and ORM
 */
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "database-notes"
import type { NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import NextAuth, { unstable_getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "database",
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_SECRET || "",
		}),
	],
	debug: false,
	callbacks: {
		async session({ session, user }) {
			const userData = await prisma.user.findUnique({
				where: {
					id: user.id,
				},
				select: {
					id: true,
				},
			})

			return {
				...session,
				userId: user.id,
				user: {
					...session.user,
					id: user.id,
					name: user.name,
				},
			}
		},
		// Seems to be required for custom sign in page to work
		// Does skip sign in process, just signs in.
		async redirect({ baseUrl }) {
			return baseUrl
		},
	},
}

export default NextAuth(authOptions)

export const hasUserSession = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const session = await unstable_getServerSession(req, res, authOptions)
	if (session) {
		return session.userId
	}
	throw new Error("User not found!")
}
