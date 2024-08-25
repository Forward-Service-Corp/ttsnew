import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import Head from "next/head";
import ReferralContainer from "../components/referralContainer";
import {useState} from "react";
import CarePlansIntro from "../components/carePlansIntro";
import CarePlansInstructions from "../components/carePlansInstructions";

export default function CarePlans({pageDataJson}) {

    const {user, referrals, notes} = pageDataJson
    const [tasks, setTasks] = useState(pageDataJson.tasks || [])
    const [userReferrals, setUserReferrals] = useState(referrals)
    const [sort] = useState('priority')

    return (
        <Layout title={"CARE Plans"} session={user}>
            <Head>
                <title>TTS / Care Plans</title>
            </Head>
            <CarePlansIntro/>
            <CarePlansInstructions/>

            <div className={`flex justify-between align-middle items-center`}>
                <div><h2 className={"uppercase text-gray-500 my-4"}>Manage Care Plans</h2></div>
            </div>

            {userReferrals.filter(item => !item.hasOwnProperty("archived") || item.archived === "false" || item.archived === null).sort((a, b) => {
                if (sort === 'domain') {
                    return a.domain.localeCompare(b.domain)
                } else {

                    if (a.priority !== null) {
                        a = parseInt(a.priority)
                    } else {
                        a = 0
                    }
                    if (b.priority !== null || true) {
                        b = parseInt(b.priority)
                    } else {
                        b = 0
                    }
                    return b - a

                }

            }).map((item, i) => {
                return (
                    <ReferralContainer key={item._id}
                                       item={item}
                                       user={user}
                                       tasks={tasks.filter((task) => task.referralId === item._id)} notes={notes} i={i}
                                       setTasks={setTasks}
                                       modifier={user.email}
                                       loggedInUser={user}
                                       setUserReferrals={setUserReferrals}/>
                )
            })}

            <h2 className={"uppercase text-gray-500 mb-4 mt-10"}>Archived Care Plans</h2>
            {userReferrals.filter(item => item.hasOwnProperty("archived") && item.archived === "true").sort((a, b) => {
                if (sort === 'domain') {
                    return a.domain.localeCompare(b.domain)
                } else {

                    if (a.priority !== null) {
                        a = parseInt(a.priority)
                    } else {
                        a = 0
                    }
                    if (b.priority !== null || true) {
                        b = parseInt(b.priority)
                    } else {
                        b = 0
                    }
                    return b - a

                }
            }).map(item => {
                return (
                    <ReferralContainer key={item._id} item={item} user={user} notes={notes}
                                       modifier={user.email}
                                       tasks={tasks.filter((task) => task.referralId === item._id)}
                                       loggedInUser={user}
                                       setUserReferrals={setUserReferrals}/>
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

    // redirect to profile page if required fields are not complete
    const {county, name, homeCounty, programs} = pageDataJson.user
    if(!county.length || !homeCounty || !programs.length || !name) return  {redirect: {destination: "/profile", permanent: false}}

    return {
        props: {pageDataJson}
    }

}

