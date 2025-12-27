// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server";
// import prismaClient from "@/lib/prismaClient";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name: string;
//       image: string;
//       email: string;
//     };
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: "telegram-login",
//       name: "Telegram Login",
//       credentials: {},
//       async authorize(credentials, req) {
//         const validator = new AuthDataValidator({
//           botToken: `${process.env.BOT_TOKEN}`,
//         });

//         const data = objectToAuthDataMap(req.query || {});
//         const user = await validator.validate(data);

//         if (user.id && user.first_name) {
//           const returned = {
//             id: user.id.toString(),
//             email: user.id.toString(),
//             name: [user.first_name, user.last_name || ""].join(" "),
//             image: user.photo_url,
//           };

//           try {
//             const hasUser = await prismaClient.user.findFirst({
//               where: { name: user.first_name },
//             });
//             if (hasUser) {
//               await prismaClient.user.update({
//                 data: {
//                   name: user.first_name,
//                   image: user.photo_url,
//                 },
//                 where: {
//                   id: hasUser.id,
//                 },
//               });
//             } else {
//               await prismaClient.user.create({
//                 data: {
//                   id: user.id.toString(),
//                   name: user.first_name,
//                   image: user.photo_url,
//                 },
//               });
//             }
//           } catch {
//             console.log("Something went wrong while creating the user.");
//           }

//           return returned;
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, user, token }) {
//       session.user.id = session.user.email;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
