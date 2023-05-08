/**
 * Authentication route using NextAuth
 * Prisma adapter provides type mapping and ORM
 */
import { prisma } from 'database';
import { Role } from 'database/generated/prisma-client';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import NextAuth, { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'database',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
  ],
  debug: false,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, user }) {
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
    },
    // Seems to be required for custom sign in page to work
    // Does skip sign in process, just signs in.
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  events: {
    async createUser({ user }) {
      /** Create a default settings for user if they dont have one */
      await prisma.settings.create({
        data: {
          userId: user.id,
        },
      });
    },
  },
};

export default NextAuth(authOptions);

export const hasUserSession = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return session.userId;
  }
  throw new Error('User not found!');
};
