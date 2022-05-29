import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";
import ReferralContainer from "../../components/referralContainer";

export default function CarePlan({pageDataJson}) {

    const router = useRouter()
    const {user, referrals} = pageDataJson
    const {surveyId} = router.query

    return (
        <Layout title={"Create Care Plan"} session={user}>
            {referrals.filter(referral => referral.surveyId === surveyId.toString()).map(item => {
                return (
                    <ReferralContainer key={item._id} item={item} user={user}/>
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
