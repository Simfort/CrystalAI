import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import YandexProvider from "next-auth/providers/yandex";
import prisma from "./prismaClient";

// Расширяем тип User из NextAuth, добавляя crystalsCount
interface ExtendedUser extends User {
  crystalsCount?: number;
}

// Тип для аргумента callback signIn
interface SignInParams {
  user: User;
  account: unknown;
  profile: unknown;
}

// Тип для аргумента callback session
export interface SessionParams {
  session: Session & { user: ExtendedUser };
  token: JWT;
}

export const authConfig: NextAuthOptions = {
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID!,
      clientSecret: process.env.YANDEX_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const hasUser = await prisma.user.findFirst({
          where: {
            email: user.email!,
          },
        });

        if (!hasUser) {
          await prisma.user.create({
            data: {
              id: user.id,
              image: user.image ?? null,
              email: user.email!,
              name: user.name!,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    // @ts-expect-error ошибка связанная с sessionParams
    async session({ session, token }: SessionParams): Promise<Session> {
      if (session.user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { crystalsCount: true },
        });

        session.user.image = token.picture as string | undefined;
        session.user.name = token.name as string | undefined;
        session.user.email = token.email as string | undefined;
        session.user.crystalsCount = dbUser?.crystalsCount ?? 0;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // должно быть определено
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
  },
};
