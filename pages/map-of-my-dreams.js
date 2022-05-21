import Layout from "../components/layout";
import {getSession} from "next-auth/react";

export default function MapOfMyDreams({user, dreams, surveys}) {
    return (
        <Layout title={"Map of My Dreams"} session={user}>
            Content
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}
    const {req} = context;

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    console.log(context.resolvedUrl)

    // user data
    const url =  baseUrl + "/api/get-user?email=" + session.user.email
    const getUser = await fetch(url)
    const userJson = await getUser.json()

    //dreams url
    const getUserDreamsUrl = baseUrl + "/api/get-user-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    //surveys url
    const getUserSurveysUrl = baseUrl + "/api/get-user-surveys?userId=" + userJson._id
    const getSurveys = await fetch(getUserSurveysUrl)
    const surveysJson = await getSurveys.json()

    return {
        props: {
            user: userJson,
            dreams: dreamsJson,
            surveys: surveysJson
        }
    }

}

