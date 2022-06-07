import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {labelMap} from "../lib/serviceLabelsMap";
import {useRouter} from "next/router";
import CurrentReferral from "../components/currentReferral";
import Link from "next/link";
import Head from "next/head";
import moment from "moment";
import ReferralSelects from "../components/referralSelects";

export default function MapOfMyDreams({pageDataJson}) {
    const {user, surveys, referrals} = pageDataJson
    const router = useRouter()
    const [data, setData] = useState({})
    const [domains, setDomains] = useState([])
    const [currentSurvey, setCurrentSurvey] = useState(surveys.filter(survey => survey._id === router.query.surveyId))
    const [currentReferral, setCurrentReferral] = useState({})


    async function getReferrals() {
        const data = await fetch("/api/get-referral-alt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                county: router.query.county,
                domain: router.query.domain
            })
        }).then(res => res.json())

        await setData(data)

        if (data.domain && Array.isArray(data.domain)) {
            await setDomains(data.domain)
        } else {
            await setDomains(data.domain.split(" "))
        }
    }

    useEffect(() => {
        getReferrals()
            .then(res => console.log(res))
            .catch(err => console.warn(err))
    }, [])

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
            <div className={"p-3 text-sm text-white bg-indigo-600 rounded shadow"}>Please select a referral for each
                priority area.
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
                    <ReferralSelects domains={domains} currentReferral={currentReferral} setCurrentReferral={setCurrentReferral} data={data} user={user} router={router} referrals={referrals}/>

                </div>
                <div className={"flex justify-end"}>
                    <Link href={"/care-plans"} passhref>
                        <a className={"px-6 py-2 bg-indigo-600 text-xs rounded text-white"}>Go to Care Plans</a>
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

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // page data
    const pageDataUrl = baseUrl + "/api/pages/indexPageData?userId=" + session.user.email
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()

    return {
        props: {
            pageDataJson,
        }
    }

}

