import Layout from "../components/layout";
import {getSession} from "next-auth/react";

import LifeAreaSurveyForm from "../components/lifeAreaSurveyForm";
import Link from "next/link";
import {useEffect, useState} from "react";
import LasHistory from "../components/lasHistory";
import Head from "next/head";
import LasCurrent from "../components/lasCurrent";

export default function LifeAreaSurveys({pageDataJson, incomingDream}) {

    const {user, dreams, surveys} = pageDataJson
    const [currentDream, setCurrentDream] = useState("")
    const [currentDreamId, setCurrentDreamId] = useState("")
    const [surveysList, setSurveysList] = useState(surveys)

    useEffect(() => {
        if (incomingDream.hasDream) {
            setCurrentDream(incomingDream.dream)
            setCurrentDreamId(incomingDream.dreamId)
        }
    }, [])

    return (
        <Layout title={"Life Area Surveys"} session={user}>
            <Head>
                <title>TTS / Life Area Surveys</title>
            </Head>
            <h2 className={"uppercase text-gray-500 mb-5"}>Active Life Area Survey</h2>
            <LasCurrent user={user} surveys={surveysList} setSurveys={setSurveysList}
                        dreamId={currentDreamId} dream={currentDream}/>
            <h2 className={"uppercase text-gray-500 mb-5"}>Life Area Survey History</h2>
            <LasHistory user={user} surveys={surveysList} setSurveys={setSurveysList}
                        dreamId={currentDreamId} dream={currentDream}/>
        </Layout>
    )
}

export async function getServerSideProps(context) {

    let dream, dreamId
    if (context.query.dream !== undefined) {
        dream = context.query.dream
        dreamId = context.query.dreamId
    } else {
        dream = ""
        dreamId = ""
    }

    // session check and possible redirect
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}

    // dynamic url setup
    const {req} = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // page data
    const pageDataUrl = baseUrl + "/api/pages/indexPageData?userId=" + session.user.email
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()

    return {
        props: {
            pageDataJson,
            incomingDream: {
                hasDream: context.query.dream !== undefined,
                dream: dream,
                dreamId: dreamId
            }
        }
    }

}

