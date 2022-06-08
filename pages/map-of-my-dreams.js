import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/router";
import CurrentReferral from "../components/currentReferral";
import Link from "next/link";
import Head from "next/head";
import moment from "moment";
import ReferralSelects from "../components/referralSelects";
import {WarningCircle} from "phosphor-react";

export default function MapOfMyDreams({pageDataJson, referralJson}) {
    const {user, surveys} = pageDataJson
    const {referrals, domains} = referralJson
    const router = useRouter()
    const currentSurvey = surveys.filter(survey => survey._id === router.query.surveyId)
    const [currentReferral, setCurrentReferral] = useState({})
    const [userReferrals, setUserReferrals] = useState(referrals)

    if (currentSurvey.length === 0) {
        return (
            <Layout title={"Map of My Dreams"} session={user}>
                <Head>
                    <title>TTS / Map of My Dreams</title>
                </Head>
                Please go to your completed Life Area Surveys page and select a dream to map.
            </Layout>
        )
    }

    return (
        <Layout title={"Map of My Dreams"} session={user}>
            <Head>
                <title>TTS / Map of My Dreams</title>
            </Head>
            <div
                className={`p-3 text-sm text-white bg-red-600 rounded flex justify-start items-center ${userReferrals.length >= domains.length ? "hidden" : "visible"}`}>
                <span className={"mr-2"}><WarningCircle size={32} weight="thin" color={"white"}/></span>
                <span className={""}>Please select a referral for each priority area.</span>
            </div>
            <div className={""}>
                <div className={"flex py-4 w-full"}>
                    <div className={"flex-1"}>
                        <p className={"text-sm text-gray-600"}>Dream:</p>
                        <p className={"uppercase"}>{currentSurvey[0].dream}</p>
                    </div>
                    <div className={"flex-1"}>
                        <p className={"text-sm text-gray-600"}>Survey Completed:</p>
                        <p className={"uppercase"}>{moment(currentSurvey[0].datestamp).format("MMMM Do YYYY, h:mm:ss a")}</p>
                    </div>
                </div>

                <div className={"flex flex-col md:flex-row"}>
                    <CurrentReferral currentReferral={currentReferral}/>
                    <ReferralSelects domains={domains}
                                     currentReferral={currentReferral}
                                     setCurrentReferral={setCurrentReferral}
                                     user={user}
                                     router={router}
                                     referrals={referrals}
                                     userReferrals={userReferrals}
                                     setUserReferrals={setUserReferrals}/>

                </div>
                <div className={"flex justify-end"}>
                    <Link href={"/care-plans"} passhref>
                        <a className={"px-6 py-2 text-xs rounded text-white bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>Go
                            to Care Plans</a>
                    </Link>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}
    const {req} = context;

    console.log(context.query)

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // page data
    const pageDataUrl = baseUrl + "/api/pages/indexPageData?userId=" + session.user.email
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()

    //referral options
    const referralOptionsUrl = baseUrl + "/api/get-referral-options?county=" + context.query.county + "&domain=" + context.query.domain
    const getReferralOptions = await fetch(referralOptionsUrl)
    const referralJson = await getReferralOptions.json()

    return {
        props: {
            pageDataJson, referralJson
        }
    }

}

