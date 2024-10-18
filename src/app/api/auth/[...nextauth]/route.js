import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { connectWithDb } from "@/config/database";
import { User } from "@/model/user";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials) {
                await connectWithDb();
                const { email, password, username } = credentials;
                console.log(email, password, username);
                try {
                    const user = await User.findOne({
                        $or: [
                            { email: email || "" }, 
                            { username: username || "" }
                        ]
                    })
                    
                    if (!user) {
                        return null; 
                    }
                    if (await bcrypt.compare(password, user.password)) {
                       
                        return { ...user.toObject() }; 
                    } else {
                        console.log("something missing")
                        return null; 
                    }
                } catch (error) {
                    console.error(error);
                    return null; 
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    session: {
        strategy: 'jwt',
      },
      jwt: {
        secret: process.env.NEXTAUTH_SECRET,
      },
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                await connectWithDb();
                try {
                    const userData = await User.findOne({ email: user.email });
                    if (!userData) {
                        await User.create({
                            email: user.email,
                            image: user.image,
                            role: "user",
                            fullname: user.name,
                            username: user.name,
                            password: "",
                            coins:20

                        });
                    }
                    return true; 
                } catch (error) {
                    console.error(error);
                    return false; 
                }
            }
            return true; 
        },
        async jwt({ token, user }) {

            if (user) {
                const userData = await User.findOne({ email: user.email });
                if (userData) {
                    token.id = userData._id;
                    token.role = userData.role;
                    token.email = userData.email;
                    token.picture = token.picture;
                    token.sessionToken = userData.sessionToken;
                    token.expires = Date.now() + 5 * 60 * 1000; 
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id,
                role: token.role,
                email: token.email,
                picture: token.picture
            };
            await User.updateOne({ email: session.user.email }, { sessionToken: token.sessionToken });
            return session;
        }
    },
};

export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);