import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "@/lib/dbconnect";
import User from "@/models/User";

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB();
      
      const existingUser = await User.findOne({email: user.email});

      if(!existingUser) {
        // Create a new user
        const newUser = User.create({
          email: user.email,
          username: user.email.split("@")[0],
        });
      }
      return true;
    },
    async session({ session, user, token }) {
      const dbUser = await User.findOne({email: session.user.email})
      session.user.username = dbUser.username;
      session.user.createdAt = dbUser.createdAt;
      return session
    },
  },
secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };