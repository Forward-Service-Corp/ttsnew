import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import Head from "next/head";
import {useEffect, useState} from "react";
import {CaretDoubleDown, CaretDoubleUp} from "phosphor-react";
import {useRouter} from "next/router";
import ClientDetails from "../../components/clientDetails";
import DreamSingle from "../../components/dreamSingle";
import LasCurrent from "../../components/lasCurrent";
import LasHistory from "../../components/lasHistory";
import ReferralContainer from "../../components/referralContainer";
import ClientDreams from "../../components/clientDreams";
import ClientSurveys from "../../components/clientSurveys";
import ClientCarePlans from "../../components/clientCarePlans";

export default function User({viewingUserData, pageDataJson}) {

    const router = useRouter()
    const {user} = pageDataJson
    const {dreams} = viewingUserData

    const viewingUser = viewingUserData.user

    return (
        <Layout title={viewingUser.name || viewingUser.email} session={user}>

            <Head>
                <title>TTS / User / {viewingUser.name || viewingUser.email}</title>
            </Head>

            <ClientDetails viewingUser={viewingUser}/>

            <ClientDreams dreams={dreams} viewingUser={viewingUser}/>

            <ClientSurveys viewingUserData={viewingUserData} viewingUser={viewingUser}/>

            <ClientCarePlans user={user} viewingUser={viewingUser} viewingUserData={viewingUserData}/>

        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}
    const {req} = context;

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // page data
    const pageDataUrl = baseUrl + "/api/pages/indexPageData?userId=" + session.user.email
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()

    //get single client to access email
    const clientUserUrl = baseUrl + "/api/get-user?userId=" + context.query.clientId
    const getClientUser = await fetch(clientUserUrl)
    const clientUserJson = await getClientUser.json()

    // viewing user data
    const userUrl = baseUrl + "/api/pages/clientPageData?clientId=" + context.query.clientId + "&clientEmail=" + clientUserJson.email
    const getViewingUser = await fetch(userUrl)
    const viewingUserJson = await getViewingUser.json()

    return {
        props: {
            pageDataJson,
            viewingUserData: viewingUserJson,
        }
    }

}
