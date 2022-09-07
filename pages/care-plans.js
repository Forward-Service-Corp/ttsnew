import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import Head from "next/head";
import ReferralContainer from "../components/referralContainer";
import {useEffect, useState} from "react";
import {CaretDoubleDown, FilePlus} from "phosphor-react";

export default function CarePlans({pageDataJson}) {

    const {user, referrals, notes} = pageDataJson
    const [userReferrals, setUserReferrals] = useState(referrals)

    async function getUserReferrals() {
        const referrals = await fetch("/api/get-referrals?userId=" + pageDataJson.user.email)
            .then(res => res.json())
        await setUserReferrals(referrals)
    }

    useEffect(() => {
        getUserReferrals().then()
    }, [])

    return (
        <Layout title={"CARE Plans"} session={user}>
            <Head>
                <title>TTS / Care Plans</title>
            </Head>
            <div className={"bg-gray-100 p-3 mb-2 rounded text-xs"}>
                <div className={"text-lg uppercase text-gray-500 mb-4"}>Instructions</div>
                <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
                    <div className={"p-2 bg-white rounded shadow text-center relative"}>
                        <div className={"absolute left-[-10px] top-[-10px] bg-gray-700 w-[40px] h-[40px] rounded-full flex items-center justify-center align-middle text-white text-xl shadow"}>1</div>
                        to expand a referral
                        <span className={"bg-gray-700 inline-block text-white w-[100px] p-3 flex items-center justify-between rounded m-auto my-2"}>
                            <span className={"inline-block mr-2"}>Tasks: 0 </span>
                            <span className={"inline-block animate-bounce "}><CaretDoubleDown size={20} color={"white"}/></span>
                        </span>
                    </div>

                    <div className={"p-2 bg-white rounded shadow flex flex-col items-center align-middle justify-center relative"}>
                        <div className={"absolute left-[-10px] top-[-10px] bg-gray-700 w-[40px] h-[40px] rounded-full flex items-center justify-center align-middle text-white text-xl shadow"}>2</div>
                        to save a task
                        <div className={"text-center mb-3"}>
                            <span className={"text-orange-500 text-sm uppercase"}>Add a new task + </span>
                            <button className={"text-white px-4 py-1 text-xs rounded mt-2 bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>Save task</button>
                        </div>

                    </div>
                    <div className={"p-2 bg-white rounded shadow text-center relative"}>
                        <div className={"absolute left-[-10px] top-[-10px] bg-gray-700 w-[40px] h-[40px] rounded-full flex items-center justify-center align-middle text-white text-xl shadow"}>3</div>
                        to add a note to a task
                        <span className={"bg-gray-200 inline-block text-gray-600 w-[140px] p-3 flex items-center justify-between rounded m-auto my-2"}>
                            <span className={"inline-block mr-2"}>Task title...  </span>
                            <span className={"inline-block animate-bounce "}><FilePlus size={20} /></span>
                        </span>
                    </div>
                    {/*<div className={"p-2 bg-white rounded shadow"}></div>*/}
                </div>
            </div>
            <h2 className={"uppercase text-gray-500 my-4"}>Manage Care Plans</h2>
            {userReferrals.filter(item => !item.hasOwnProperty("archived") || item.archived === "false").sort((a,b) => {
                return b.domain.localeCompare(a.domain)
            }).map(item => {
                return (
                    <ReferralContainer key={item._id} item={item} user={user} notes={notes}
                                       modifier={user.email}
                                       loggedInUser={user}
                                       setUserReferrals={setUserReferrals}/>
                )
            })}

            <h2 className={"uppercase text-gray-500 mb-4 mt-10"}>Archived Care Plans</h2>
            {userReferrals.filter(item => item.hasOwnProperty("archived") && item.archived === "true").sort((a,b) => {
                return b.domain.localeCompare(a.domain)
            }).map(item => {
                return (
                    <ReferralContainer key={item._id} item={item} user={user} notes={notes}
                                       modifier={user.email}
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

    return {
        props: {pageDataJson}
    }

}

