import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import Head from "next/head";
import {useState} from "react";
import {CaretDoubleDown, CaretDoubleUp} from "phosphor-react";
import {useRouter} from "next/router";
import ClientDetails from "../../components/clientDetails";
import DreamSingle from "../../components/dreamSingle";
import LasCurrent from "../../components/lasCurrent";
import LasHistory from "../../components/lasHistory";
import ReferralContainer from "../../components/referralContainer";

export default function User({viewingUserData, pageDataJson}) {

    const router = useRouter()
    const {user} = pageDataJson
    const {dreams, surveys} = viewingUserData

    const [editMode, setEditMode] = useState(false)
    const viewingUser = viewingUserData.user
    const [savedDreams, setSavedDreams] = useState(dreams)
    const [newDreamOpen, setNewDreamOpen] = useState(false)
    const [dream, setDream] = useState("")
    const [dreamNeed, setDreamNeed] = useState("")
    const [dreamHelp, setDreamHelp] = useState("")
    const [dreamSectionOpen, setDreamSectionOpen] = useState(false)
    const [lasSectionOpen, setLasSectionOpen] = useState(false)
    const [userReferrals, setUserReferrals] = useState(viewingUserData.referrals)

    async function getDreams() {
        const newDreams = await fetch("/api/get-dreams?userId=" + viewingUser.email)
            .then(res => res.json())
        setSavedDreams(newDreams)
    }

    async function deleteDream(dreamId) {
        await fetch("/api/delete-dream?dreamId=" + dreamId)
        getDreams().then(() => {
        })
    }

    async function saveDream() {
        await fetch("/api/post-dream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dream,
                dreamNeed,
                dreamHelp,
                userId: viewingUser.email
            })
        })
    }

    return (
        <Layout title={viewingUser.name || viewingUser.email} session={user}>
            <Head>
                <title>TTS / User / {viewingUser.name || viewingUser.email}</title>
            </Head>
            <div className={`mt-5 p-6 bg-gray-100 rounded`}>
                <div className={"flex justify-between"}>
                    <div><h2 className={"uppercase text-gray-500 mb-3"}>Personal Details</h2></div>
                    {editMode ?
                        <div className={"text-sm text-red-500 underline cursor-pointer"} onClick={() => {
                            setEditMode(!editMode)
                            router.reload()
                        }}>Cancel editing
                        </div>
                        :
                        <div className={"text-sm text-orange-500 underline cursor-pointer"} onClick={() => {
                            setEditMode(!editMode)
                        }}>Edit this client
                        </div>
                    }
                </div>

                <ClientDetails viewingUser={viewingUser} editMode={editMode}/>

            </div>
            <div className={`mt-5 p-6 bg-gray-100 rounded ${dreamSectionOpen ? "h-auto" : "h-[80px] overflow-hidden"}`}>
                <div className={"flex justify-between"}>
                    <div className={"uppercase text-gray-500 flex items-center"}>Client Dreams<span
                        className={"rounded-full text-xs bg-orange-600 text-white p-1 w-[24px] inline-block text-center ml-2"}>{savedDreams.length}</span>
                    </div>
                    <div onClick={() => {
                        setDreamSectionOpen(!dreamSectionOpen)
                    }}>{dreamSectionOpen ? <CaretDoubleUp size={22}/> : <CaretDoubleDown size={22}/>}</div>
                </div>
                <div
                    className={`text-orange-600 underline text-xs cursor-pointer mt-2 ${dreamSectionOpen ? "visible" : "hidden"}`}
                    onClick={() => {
                        setNewDreamOpen(!newDreamOpen)
                    }}>{newDreamOpen ? "Close quick add panel" : "Quick add new client dream"}</div>
                <div
                    className={`grid grid-cols-3 gap-4 text-xs border-t-[1px] mt-3 overflow-hidden transition ease-in-out p-3 bg-gray-100 ${newDreamOpen ? "h-auto" : "h-0 p-0"}`}>
                    <input className={"text-xs p-1 border-0 border-b-[1px] bg-transparent"}
                           type="text"
                           value={dream}
                           placeholder={"Enter dream here..."}
                           onChange={(e) => {
                               setDream(e.target.value)
                           }}/>
                    <input className={"text-xs p-1 border-0 border-b-[1px] bg-transparent"}
                           type="text"
                           value={dreamNeed}
                           placeholder={"What do you need..."}
                           onChange={(e) => {
                               setDreamNeed(e.target.value)
                           }}/>
                    <input className={"text-xs p-1 border-0 border-b-[1px] bg-transparent"}
                           type="text"
                           value={dreamHelp}
                           placeholder={"Who do you need..."}
                           onChange={(e) => {
                               setDreamHelp(e.target.value)
                           }}/>
                    <button
                        className={"py-2 px-6 text-white text-xs rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400 w-[150px]"}
                        disabled={dream === ""}
                        onClick={() => {
                            saveDream().then(getDreams)
                            setDream("")
                            setDreamNeed("")
                            setDreamHelp("")
                        }}>Save dream
                    </button>
                </div>
                <div className={"grid grid-cols-3 gap-4 mt-6"}>{savedDreams?.map((dream, i) => {
                    return <DreamSingle key={i} dream={dream} deleteDream={deleteDream} isClientDream={true}
                                        clientId={viewingUser.email}/>
                })}</div>
            </div>
            <div className={"mt-5 p-6 bg-gray-100 rounded"}>
                <h2 className={"uppercase text-gray-500 mb-6"}>Current Life Area Survey</h2>
                <LasCurrent user={viewingUser} surveys={surveys} isClientSurvey={true} clientId={viewingUser.email}/>

                <div className={"flex justify-between mt-6 mb-6"}>
                    <div className={"uppercase text-gray-500 flex items-center"}>Life Area Survey History<span
                        className={"rounded-full text-xs bg-orange-600 text-white p-1 w-[24px] inline-block text-center ml-2"}>{surveys.length - 1}</span>
                    </div>
                    <div onClick={() => {
                        setLasSectionOpen(!lasSectionOpen)
                    }}>{lasSectionOpen ? <CaretDoubleUp size={22}/> : <CaretDoubleDown size={22}/>}</div>
                </div>
                <div className={`${lasSectionOpen ? "visible" : "hidden"}`}>
                    <LasHistory surveys={surveys} isClientView={true}/>
                </div>

            </div>
            <div className={"mt-5 p-6 bg-gray-100 rounded"}>
                <h2 className={"uppercase text-gray-500 mb-4"}>Manage Care Plans</h2>
                {userReferrals?.filter(item => !item.hasOwnProperty("archived") || item.archived === "false").map(item => {
                    return (
                        <ReferralContainer key={item._id} item={item} user={viewingUser} notes={viewingUserData.notes}
                                           setUserReferrals={setUserReferrals}/>
                    )
                })}

                <h2 className={"uppercase text-gray-500 mb-4 mt-10"}>Archived Care Plans</h2>
                {userReferrals?.filter(item => item.hasOwnProperty("archived") && item.archived === "true").map(item => {
                    return (
                        <ReferralContainer key={item._id} item={item} user={viewingUser} notes={viewingUserData.notes}
                                           setUserReferrals={setUserReferrals}/>
                    )
                })}
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

    //get single client to access email
    const clientUserUrl = baseUrl + "/api/get-user?userId=" + context.query.clientId
    const getClientUser = await fetch(clientUserUrl)
    const clientUserJson = await getClientUser.json()

    // viewing user data
    const userUrl = baseUrl + "/api/pages/clientPageData?clientId=" + context.query.clientId + "&clientEmail=" + clientUserJson.email
    const getViewingUser = await fetch(userUrl)
    const viewingUserJson = await getViewingUser.json()

    return {
        props: {
            pageDataJson,
            viewingUserData: viewingUserJson,
        }
    }

}
