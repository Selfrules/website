// NextAuth Configuration
// Authentication for admin dashboard with credentials provider

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

// TEMPORARY: Hardcoded hash for development (password: admin123)
// TODO: Move to proper secret management for production
const ADMIN_PASSWORD_HASH = '$2b$12$Rp2qNdqtPeHN2jWgBHlyTu1tBkrNAQ3fwghUfRncond2TDwLsbiVi';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if email matches admin email
        if (credentials.email !== process.env.ADMIN_EMAIL) {
          return null;
        }

        // Verify password against hashed password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          ADMIN_PASSWORD_HASH
        );

        if (!passwordMatch) {
          return null;
        }

        // Return user object
        return {
          id: '1',
          email: credentials.email,
          name: 'Admin',
          role: 'admin',
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin';
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
