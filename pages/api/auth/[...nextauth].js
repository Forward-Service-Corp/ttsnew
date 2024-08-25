import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import Credentials from "next-auth/providers/credentials";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"
import {connectToDatabase} from "../../../lib/dbConnect";

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt"
    },
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                phone: {label: "Phone", type: "text", placeholder: "phone"},
                response: {label: "Response", type: "text"}
            },
            async authorize(credentials, req) {
                const {phone, response} = credentials;
                const {db} = await connectToDatabase()
                const userSearch = await db
                    .collection("users")
                    .findOne({phone: phone})

                if(response === "approved"){
                    // If no error and we have user data, return it
                    const user = {
                        id: userSearch._id.toString(),
                        name: userSearch.name,
                        email: userSearch.email,
                    }
                    console.log(user)
                    return user
                }else{
                    // Return null if user data could not be retrieved
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/sign-in",
        verifyRequest: "/auth/verify-request",
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
    events: {
        signIn: async ({user, isNewUser}) => {
            if (isNewUser) {
                const userEmail = user.email
                const isFSCEmail = user.email.indexOf("fsc-corp.org") > -1
                const {db} = await connectToDatabase()
                await db.collection("users").updateOne({"email": userEmail}, {
                    $set: {
                        "level": isFSCEmail ? "coach" : "client",
                        "name": "",
                        "county": [],
                        "homeCounty": "",
                        "programs": []
                    }
                })
            }
        }
    }
})
