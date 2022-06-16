import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useState} from "react";
import UsersTable from "../components/usersTable";
import Head from "next/head";

export default function Users({user, users}) {

    const [usersData, setUsersData] = useState()

    return (
        <Layout title={"Users"} session={user}>
            <Head>
                <title>TTS Users</title>
            </Head>
            <UsersTable users={users}/>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}
    const {req} = context;

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // user data
    const url =  baseUrl + "/api/get-user?email=" + session.user.email
    const getUser = await fetch(url)
    const userJson = await getUser.json()

    // tasks data
    const getUsersUrl = baseUrl + "/api/get-users"
    const getUsers = await fetch(getUsersUrl)
    const usersJson = await getUsers.json()

    return {
        props: {
            user: userJson,
            users: usersJson
        }
    }

}

