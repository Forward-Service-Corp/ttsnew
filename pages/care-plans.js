import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import ReferralContainer from "../components/referralContainer";

export default function CarePlans({pageDataJson}) {
    const {user, referrals, tasks, notes, surveys} = pageDataJson
    return (
        <Layout title={"Care Plans"} session={user}>
            <Head>
                <title>TTS / Care Plans</title>
            </Head>
            <h2 className={"uppercase text-gray-500 mb-4"}>Manage Care Plans</h2>
            {referrals.map(item => {
                return (
                    <ReferralContainer key={item._id} item={item} user={user} notes={notes}/>
                )
            })}
            {/*{surveys.map(survey => {*/}
            {/*    return (*/}
            {/*        <div className={"rounded border mb-3 shadow flex overflow-hidden"} key={survey._id}>*/}
            {/*            <div className={"flex-grow p-3 "}>*/}
            {/*                <p>{survey.dream}</p>*/}
            {/*                <Link passhref href={"/care-plan/" + survey._id}>*/}
            {/*                    <a className={"text-indigo-600 underline text-xs"}>Manage this care plan</a>*/}
            {/*                </Link>*/}
            {/*            </div>*/}
            {/*            <div className={"bg-indigo-500 text-white py-3 px-6 text-center text-xs flex-initial"}>*/}
            {/*                <p>To-do items:</p>*/}
            {/*                <p className={"text-xl"}>{tasks.filter(task => task.surveyId === survey._id).length}</p>*/}
            {/*            </div>*/}
            {/*            <div className={"bg-indigo-600 text-white py-3 px-6 text-center text-xs flex-initial"}>*/}
            {/*                <p>Total referrals:</p>*/}
            {/*                <p className={"text-xl"}>{referrals.filter(referral => referral.surveyId === survey._id).length}</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}
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
        props: {pageDataJson}
    }

}

