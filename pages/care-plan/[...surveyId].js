import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";
import ReferralContainer from "../../components/referralContainer";

export default function CarePlan({user, referrals, query, surveys}) {
    const router = useRouter()
    const {surveyId} = router.query
    return (
        <Layout title={"Survey id: " + surveyId} session={user}>
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

    // user data
    const url = baseUrl + "/api/get-user?email=" + session.user.email
    const getUser = await fetch(url)
    const userJson = await getUser.json()

    // survey data
    const getUserSurveysUrl = baseUrl + "/api/get-surveys?userId=" + userJson._id
    const getSurveys = await fetch(getUserSurveysUrl)
    const surveysJson = await getSurveys.json()

    // referral data
    const getUserReferralsUrl = baseUrl + "/api/get-referrals?userId=" + userJson._id
    const getReferrals = await fetch(getUserReferralsUrl)
    const referralsJson = await getReferrals.json()

    return {
        props: {
            user: userJson,
            referrals: referralsJson,
            surveys: surveysJson,
            query: context.query
        }
    }

}
