import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "database";
import { Role } from "database/generated/prisma-client";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: String(process.env.GOOGLE_ID),
      clientSecret: String(process.env.GOOGLE_SECRET),
    }),
  ],
  debug: false,
  pages: {
    // signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, user }) {
      try {
        const userData = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
          select: {
            role: true,
            id: true,
          },
        });

        // Add user ID and role to session object
        return {
          ...session,
          userId: user.id,
          user: {
            ...session.user,
            id: user.id,
            name: user.name,
            role: userData?.role ?? Role.USER,
          },
        };
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
      }
    },
  },
  events: {
    async createUser({ user }) {
      try {
        /** Create a default settings for user if they dont have one */
        await prisma.settings.create({
          data: {
            userId: user.id,
          },
        });
      } catch (error) {
        console.error("Error creating user settings:", error);
        throw error;
      }
    },
  },
};

export default NextAuth(authOptions);

export const hasUserSession = async (
  request: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerSession(request, res, authOptions);
  if (session) {
    return session.userId;
  }
  throw new Error("User not found!");
};
