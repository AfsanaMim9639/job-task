import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import { authConfig } from './auth.config'

// Mock user database
const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@bddata.com',
    password: 'password123',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Contributor User',
    email: 'contributor@bddata.com',
    password: 'password123',
    role: 'contributor'
  },
  {
    id: '3',
    name: 'Public User',
    email: 'user@bddata.com',
    password: 'password123',
    role: 'public'
  }
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find(u => u.email === credentials.email)
        
        if (!user) {
          return null
        }

        // Simple password check for demo (NOT for production!)
        const isPasswordValid = user.password === credentials.password

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    }
  }
})