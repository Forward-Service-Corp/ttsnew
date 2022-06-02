import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useState} from "react";
import SavedDreams from "../components/savedDreams";
import Head from "next/head";
import DreamIntro from "../components/pages/dreamIntro";
import DreamForm from "../components/dreamForm";

export default function Dreams({pageDataJson}) {

    const {user, dreams} = pageDataJson
    const [savedDreams, setSavedDreams] = useState(dreams)
    const [isLoading, setIsLoading] = useState(false)



    return (
        <Layout title={"Dreams"} session={user} loadingState={isLoading}>
            <Head>
                <title>TTS / Dreams</title>
            </Head>
            <div className={""}>
                <DreamIntro/>
                <DreamForm setSavedDreams={setSavedDreams} user={user} setIsLoading={setIsLoading}/>
                <SavedDreams savedDreams={savedDreams} setLoadingState={setIsLoading} saveDreams={setSavedDreams}
                             user={user}/>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}
    const {req} = context;

    // set up dynamic url
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // page data
    const pageDataUrl = baseUrl + "/api/pages/indexPageData?userId=" + session.user.email
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()

    return {
        props: {pageDataJson}
    }

}

