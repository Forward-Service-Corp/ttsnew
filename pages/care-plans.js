import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import Head from "next/head";
import ReferralContainer from "../components/referralContainer";

export default function CarePlans({pageDataJson}) {
    const {user, referrals, notes} = pageDataJson
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

