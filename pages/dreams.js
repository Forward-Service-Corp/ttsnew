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
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                    <DreamIntro/>
                    <DreamForm setSavedDreams={setSavedDreams} user={user} setIsLoading={setIsLoading}/>
                </div>
                <div className={"bg-gray-100 p-3 my-10 rounded"}>
                    <h2 className={"text-gray-600 uppercase"}><span className={"text-orange-500"}>Hint: </span>Completing a Life Area Survey</h2>
                    <p className={"text-sm"}>Completing a Life Area Survey is easy! Simply choose a dream you would like to survey and click the &quot;Survey&quot; button to continue to a new survey page.</p>
                </div>
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

