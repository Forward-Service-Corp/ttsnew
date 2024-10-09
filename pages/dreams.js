import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import SavedDreams from "../components/savedDreams";
import Head from "next/head";
import DreamIntro from "../components/pages/dreamIntro";
import DreamForm from "../components/dreamForm";

export default function Dreams({user, dreams}) {

    const [savedDreams, setSavedDreams] = useState([])
    const [simpleModal, setSimpleModal] = useState(false)
    const [currentTab, setCurrentTab] = useState("active")

    useEffect(() => {
        setSavedDreams(dreams)
    }, [dreams]);

    return (
        <Layout title={"Dreams"} session={user} simpleModal={simpleModal} simpleModalTitle={`Great Work!`} simpleModalMessage={`You just created a new dream.`} simpleModalLabel={`Awesome!`}>
            <Head>
                <title>TTS / Dreams</title>
            </Head>
            <div className={""}>
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                    <DreamIntro/>
                    <DreamForm setSavedDreams={setSavedDreams} user={user} setSimpleModal={setSimpleModal}/>
                </div>
                <div className={'p-8 bg-orange-500 text-white my-5 text-center rounded-lg font-extralight'}>
                    <span className={'text-3xl block'}>&quot;You&apos;re braver than you believe, stronger than you seem, and smarter than you
                        think.&quot;</span>
                    <span className={'text-sm text-gray-300'}>A.A.Milne, English author of Winnie the Pooh</span>
                </div>

                <div className={"bg-gray-200 px-8 py-4 mb-4 rounded-lg flex justify-between items-center"}>
                    <div className={'font-extralight text-xl'}>
                        You Are Viewing: <span className={'capitalize font-bold'}>{currentTab} Dreams</span>
                    </div>
                    <div>
                        <select className={"text-xs border-gray-300 rounded mx-1"}
                                id={"currentTab"}
                                defaultValue={"active"}
                                onChange={(e) => {
                                    setCurrentTab(e.target.value)
                                }}>
                            <option value="all">All - {savedDreams.length}</option>
                            <option value="active">Active - {savedDreams.filter(dream => dream.status === "active").length}</option>
                            <option value="complete">Complete - {savedDreams.filter(dream => dream.status === "complete").length}</option>
                            <option value="archived">Archived - {savedDreams.filter(dream => dream.status === "archived").length}</option>
                        </select>
                    </div>
                </div>
                <div className={`${currentTab === "all" ? "visible" : "hidden"}`}>
                    <SavedDreams savedDreams={savedDreams}
                                 setSavedDreams={setSavedDreams}/>
                </div>
                <div className={`${currentTab === "active" ? "visible" : "hidden"}`}>
                    <SavedDreams savedDreams={savedDreams.filter(dream => dream.status === "active")}
                                 setSavedDreams={setSavedDreams}/>
                </div>
                <div className={`${currentTab === "complete" ? "visible" : "hidden"}`}>
                    <SavedDreams savedDreams={savedDreams.filter(dream => dream.status === "complete")}
                                 setSavedDreams={setSavedDreams}/>
                </div>
                <div className={`${currentTab === "archived" ? "visible" : "hidden"}`}>
                    <SavedDreams savedDreams={savedDreams.filter(dream => dream.status === "archived")}
                                 setSavedDreams={setSavedDreams}/>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (!session) return {redirect: {destination: "/login", permanent: false}}
    const {req} = context;

    // set up dynamic url
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // page data
    const dataUrl = baseUrl + "/api/pages/dreamsPageData?userId=" + session.sub
    const getData = await fetch(dataUrl)
    const {user, dreams} = await getData.json()

    // redirect to profile page if required fields are not complete
    if(!user.county.length || !user.homeCounty  || !user.programs.length || !user.name) return  {redirect: {destination: "/profile", permanent: false}}

    return {
        props: {user, dreams}
    }

}

