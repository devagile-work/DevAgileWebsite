import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongo();
        
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        if (user.authProvider !== "credentials") {
           throw new Error("Please sign in using your Google account");
        }

        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordMatch) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await connectMongo();
        try {
          let dbUser = await User.findOne({ email: user.email });

          if (!dbUser) {
            dbUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              authProvider: "google",
            });
          }
          return true;
        } catch (error) {
          console.error("Error saving Google user", error);
          return false;
        }
      }
      return true; // Proceed for credentials provider
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id?.toString() || user._id?.toString();
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/loginAndSignUp",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
