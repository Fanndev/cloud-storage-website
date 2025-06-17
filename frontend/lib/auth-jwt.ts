// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 86400, // 1 day in seconds
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   providers: [
//     CredentialsProvider({
//       name: process.env.NEXTAUTH_SECRET,
//       type: "credentials",
//       credentials: {
//         email: {
//           label: "email",
//           type: "email",
//         },
//         password: {
//           label: "password",
//           type: "password",
//         },
//       },
//       async authorize(credentials, req) {
//         try {
//           const response = await axios.post(
//             `${process.env.NEXT_API_URL}/auth/`,
//             credentials
//           );
//           console.log("Response from login endpoint:", response.data);

//           const data = response.data;

//           if (!data?.token) {
//             throw new Error("Invalid login credentials");
//           }

//           // Return the user object along with the token
//           return { ...data.user, accessToken: data.token };
//         } catch (error) {
//           console.error("Error during login request:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }:any) {
//       if (user) {
//         token.accessToken = user.accessToken;
//       }

//       try {
//         const decodedToken = jwtDecode(token.accessToken);
//         token.exp = decodedToken.exp;
//       } catch (error) {
//         console.error("Error decoding token", error);
//       }

//       return token;
//     },
//     async session({ session, token }:any) {
//       if (token?.error) {
//         throw new Error("Access token has expired");
//       }

//       session.accessToken = token.accessToken;
//       session.user = { email: token.email || "" };

//       return session;
//     },
//   },
// };
