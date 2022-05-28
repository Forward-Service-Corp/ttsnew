import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";

export default function User({user, viewingUser, dreams, referrals, query, surveys}) {
    const router = useRouter()
    const {userId} = router.query
    return (
        <Layout title={viewingUser.name} session={user}>
            <Head>
                <title>TTS / User / {viewingUser.name}</title>
            </Head>
            <div>
                <h2 className={"uppercase text-gray-500 mb-3"}>Personal Details</h2>
                <div className={"flex"}>
                    <div className={"flex-1"}>
                        <p className={"text-gray-500 text-xs"}>Email</p>
                        <p>{viewingUser.email}</p>
                        <p className={"text-gray-500 text-xs mt-4"}>Phone</p>
                        <p>{viewingUser.phone}</p>
                        <p className={"text-gray-500 text-xs mt-4"}>User ID</p>
                        <p>{viewingUser._id}</p>
                        <p className={"text-gray-500 text-xs mt-4"}>County</p>
                        <ul>
                            {viewingUser.county.map(county => (
                                <li key={county}>{county}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={"flex-1"}>
                        <p className={"text-gray-500 text-xs"}>Address</p>
                        <p>{viewingUser.street}</p>
                        <p className={"text-gray-500 text-xs mt-4"}>City</p>
                        <p>{viewingUser.city}</p>
                        <p className={"text-gray-500 text-xs mt-4"}>State</p>
                        <p>{viewingUser.state}</p>
                        <p className={"text-gray-500 text-xs mt-4"}>Programs</p>
                        <ul>
                            {viewingUser.programs.map((county, i) => (
                                <li key={i}>{county}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={"py-6"}>
                <h2 className={"uppercase text-gray-500"}>Dreams</h2>
                {dreams.map((dream, i) => {
                    return (
                        <div key={i}>{dream.dream}</div>
                    )
                })}
            </div>
            <div>
                <h2 className={"uppercase text-gray-500"}>Surveys</h2>
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

    // user data
    const url = baseUrl + "/api/get-user?email=" + session.user.email
    const getUser = await fetch(url)
    const userJson = await getUser.json()

    // viewing user data
    const userUrl = baseUrl + "/api/get-user?userId=" + context.query.userId
    const getViewingUser = await fetch(userUrl)
    const viewingUserJson = await getViewingUser.json()

    // dreams data
    const getUserDreamsUrl = baseUrl + "/api/get-dreams?userId=" + context.query.userId
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    // survey data
    const getUserSurveysUrl = baseUrl + "/api/get-surveys?userId=" + context.query.userId
    const getSurveys = await fetch(getUserSurveysUrl)
    const surveysJson = await getSurveys.json()

    // referral data
    const getUserReferralsUrl = baseUrl + "/api/get-referrals?userId=" + context.query.userId
    const getReferrals = await fetch(getUserReferralsUrl)
    const referralsJson = await getReferrals.json()

    return {
        props: {
            user: userJson,
            viewingUser: viewingUserJson,
            dreams: dreamsJson,
            referrals: referralsJson,
            surveys: surveysJson,
            query: context.query
        }
    }

}
