import { AuthService, UserService } from "@/app/_services";
import { AuthUser } from "@/app/_services/common/types";
import { AuthOptions, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Custom",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          const tokenResponse = await AuthService.login(credentials!);

          if (tokenResponse && tokenResponse.accessToken) {
            const token = tokenResponse.accessToken;

            const user = await UserService.getUserByToken(token);

            if (user) {
              return {
                user,
                accessToken: token,
              } as unknown as User;
            }
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const accessToken = (user as AuthUser).accessToken;
        return {
          ...token,
          accessToken,
          user,
        };
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      if (token) {
        const loggedUser = token.user as AuthUser;

        return {
          ...session,
          ...loggedUser,
        };
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
