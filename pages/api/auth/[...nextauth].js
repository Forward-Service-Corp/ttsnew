import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import {connectToDatabase} from "../../../lib/dbConnect";
import {ObjectId} from "mongodb";

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        EmailProvider({
            server: {
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            },
            from: process.env.SMTP_FROM
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            if (user.hasOwnProperty("level")) {
                return true
            } else {

                const {db} = await connectToDatabase()
                await db.collection("users")
                    .updateOne(
                        {_id: ObjectId(user.id)},
                        {
                            $set: {
                                level: "client"
                            }
                        }
                    )

                return true
            }

        },
        async redirect({url, baseUrl}) {
            return baseUrl
        },
        async session({session, user, token}) {
            return session
        },
        async jwt({token, user, account, profile, isNewUser}) {
            return token
        }
    }

})
