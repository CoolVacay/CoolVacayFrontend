import NextAuth from "next-auth";
import type { User, NextAuthConfig, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import Google from "next-auth/providers/google";
import facebook from "next-auth/providers/facebook";
import { postFetch } from "./app/utils/api-helpers";
import type { UserData } from "./app/(application)/definitions";

type CustomUser =
  | (User & Pick<UserData["profile"], "phone" | "dateOfBirth" | "lastName">)
  | null;

declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
  interface User {
    id?: string;
    name?: string | null;
    lastName?: string | null;
    phone?: string;
    email?: string | null;
    dateOfBirth: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    lastName: string;
    phone: string;
    dateOfBirth: string;
  }
}

async function getUserFromDb(email: string, password: string) {
  try {
    const userData = await postFetch<UserData | undefined>(
      "/Auth/access-token",
      {
        email,
        password,
      },
    );
    return userData;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user");
  }
}

const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials): Promise<CustomUser> => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserFromDb(email, password);
          if (user?.accessToken) {
            return {
              id: user.profile.id.toString(),
              name: user.profile.firstName,
              lastName: user.profile.lastName,
              phone: user.profile.phone,
              email: user.profile.email,
              dateOfBirth: user.profile.dateOfBirth,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    Google,
    facebook,
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
        session.user.dateOfBirth = token.dateOfBirth;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user && token) {
        token.id = user.id!;
        token.lastName = user.lastName!;
        token.phone = user.phone!;
        token.dateOfBirth = user.dateOfBirth;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
