import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import Head from "next/head";
import ReferralContainer from "../components/referralContainer";
import {useEffect, useState} from "react";
import {CaretDoubleDown, FilePlus} from "phosphor-react";

export default function CarePlans({pageDataJson}) {

    const {user, referrals, notes} = pageDataJson
    const [userReferrals, setUserReferrals] = useState(referrals)
    const [sort, setSort] = useState('priority')
    const sortMap = {
        'priority': 'right-[10px]',
        'domain': 'left-[10px]'
    }

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

            {/*intro*/}
            <div className={"text-sm pt-4 pb-6 mb-4 bg-gray-600 text-white text-center dark:bg-opacity-0"}>
                <p><strong>&quot;To accomplish great things, we must not only act but also dream - not only plan, but also believe.&quot;</strong>
                    --Anatole France, French poet and novelist</p>

                <p>You know the <strong>Life Areas</strong> you want to work on - your priorities. Your coach can help
                    you create a <strong>CARE</strong> (<strong>C</strong>oordinating <strong>A</strong>ll <strong>R</strong>esources <strong>E</strong>ffectively) Plan.</p>

                <p>For each area you&apos;ve identified as a priority, on your CARE Plan with your TTS Coach, list actions you can take and any reminders you need to keep you going.</p>

            </div>

            {/*instructions*/}
            <div className={"bg-gray-100 p-3 mb-2 text-xs dark:bg-opacity-0"}>

                <div className={"text-lg uppercase text-gray-500 mb-4 "}>Instructions</div>
                <div className={"grid grid-cols-1 md:grid-cols-3 gap-4"}>
                    <div className={"p-2 bg-white shadow text-center relative dark:bg-opacity-80 rounded-xl"}>
                        <div
                            className={"absolute left-[-10px] top-[-10px] bg-gray-700 w-[40px] h-[40px] rounded-full flex items-center justify-center align-middle text-white text-xl shadow dark:bg-blue-700"}>1
                        </div>
                        to expand a referral
                        <span
                            className={"bg-gray-700 text-white w-[100px] p-3 flex items-center justify-between m-auto my-2"}>
                            <span className={"inline-block mr-2"}>Tasks: 0 </span>
                            <span className={"inline-block animate-bounce "}><CaretDoubleDown size={20}
                                                                                              color={"white"}/></span>
                        </span>
                    </div>

                    <div
                        className={"p-2 bg-white shadow flex flex-col items-center align-middle justify-center relative dark:bg-opacity-80 rounded-xl"}>
                        <div
                            className={"absolute left-[-10px] top-[-10px] bg-gray-700 w-[40px] h-[40px] rounded-full flex items-center justify-center align-middle text-white text-xl shadow dark:bg-blue-700"}>2
                        </div>
                        to save a task
                        <div className={"text-center mb-3"}>
                            <span className={"text-sm uppercase"}>Add a new task + </span>
                            <button className={"text-white px-4 py-2 text-xs mt-2 bg-blue-500"}>Save task</button>
                        </div>

                    </div>
                    <div className={"p-2 bg-white shadow text-center relative dark:bg-opacity-80 rounded-xl"}>
                        <div
                            className={"absolute left-[-10px] top-[-10px] bg-gray-700 w-[40px] h-[40px] rounded-full flex items-center justify-center align-middle text-white text-xl shadow dark:bg-blue-700"}>3
                        </div>
                        to add a note to a task
                        <span
                            className={"bg-gray-200 text-gray-600 w-[140px] p-3 flex items-center justify-between m-auto my-2"}>
                            <span className={"inline-block mr-2"}>Task title...  </span>
                            <span className={"inline-block animate-bounce "}><FilePlus size={20}/></span>
                        </span>
                    </div>
                    {/*<div className={"p-2 bg-white rounded shadow"}></div>*/}
                </div>
            </div>
            <div className={`flex justify-between align-middle items-center`}>
                <div><h2 className={"uppercase text-gray-500 my-4"}>Manage Care Plans</h2></div>
                <div>
                    <div className={`text-white flex w-[155px] align-middle items-center justify-around bg-blue-900 rounded-xl p-3 text-sm font-thin relative cursor-pointer`}>
                        <div className={`absolute h-[35px] w-[70px] bg-blue-700 ${sortMap[sort]} z-0 p-1 rounded-xl shadow-xl transition-all ease-in-out`}></div>
                        <div onClick={() => {
                            setSort('domain')
                            getUserReferrals().then()
                        }} className={`z-10`}>Domain</div>
                        <div onClick={() => {
                            setSort('priority')
                            getUserReferrals().then()
                        }} className={`z-10`}>Priority</div>
                    </div>
                </div>
            </div>

            {userReferrals.filter(item => !item.hasOwnProperty("archived") || item.archived === "false" || item.archived === null).sort((a, b) => {
                if(sort === 'domain'){
                    return a.domain.localeCompare(b.domain)
                }else{

                    if(a.priority !== null){
                        a = parseInt(a.priority)
                    }else{
                        a = 0
                    }
                    if(b.priority !== null || true){
                        b = parseInt(b.priority)
                    }else{
                        b = 0
                    }
                    return b - a

                }

            }).map((item, i) => {
                return (
                    <ReferralContainer key={item._id} item={item} user={user} notes={notes} i={i}
                                       modifier={user.email}
                                       loggedInUser={user}
                                       setUserReferrals={setUserReferrals}/>
                )
            })}

            <h2 className={"uppercase text-gray-500 mb-4 mt-10"}>Archived Care Plans</h2>
            {userReferrals.filter(item => item.hasOwnProperty("archived") && item.archived === "true").sort((a, b) => {
                if(sort === 'domain'){
                    return a.domain.localeCompare(b.domain)
                }else{

                    if(a.priority !== null){
                        a = parseInt(a.priority)
                    }else{
                        a = 0
                    }
                    if(b.priority !== null || true){
                        b = parseInt(b.priority)
                    }else{
                        b = 0
                    }
                    return b - a

                }
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

