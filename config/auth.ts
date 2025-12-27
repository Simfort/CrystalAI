import type { NextAuthOptions } from "next-auth";
import YandexProvider from "next-auth/providers/yandex";

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
    async session({ session, token }) {
      if (session.user) {
        session.user.image = token.picture as string;
        session.user.name = token.name as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // добавляем ID пользователя
        token.picture = user.image; // email
        token.name = user.name; // имя
      }
      return token;
    },
  },
};
