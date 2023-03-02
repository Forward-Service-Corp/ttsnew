import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import {connectToDatabase} from "../../../lib/dbConnect";

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
    callbacks: {
        async signIn({user, account, profile, email, credentials}) {
            user.timestamp = new Date()
            return true
        }
    },
    events: {
        signIn: async ({user, isNewUser}) => {
            if (isNewUser) {
                const userEmail = user.email
                const isFSCEmail = user.email.indexOf("fsc-corp.org") > -1
                const {db} = await connectToDatabase()
                await db.collection("users").updateOne({"email": userEmail}, {$set: {"level": isFSCEmail ? "coach" : "client"}})
            }

        }
    }
})
