import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {useEffect, useState} from "react";
import NewEmailAssignment from "../../components/newEmailAssignment";
import CoachAssignments from "../../components/coachAssignments";
import WorkbookToggle from "../../components/workbookToggle";

export default function User({viewingUser, pageDataJson, coachesJson}) {

    const router = useRouter()
    const {user} = pageDataJson
    const [role, setRole] = useState(viewingUser.level)
    const [roleChanged, setRoleChanged] = useState(false)
    const [version, setVersion] = useState(null)
    const [clients, setClients] = useState(null)

    const [dataChanged, setDataChanged] = useState(false)

    async function saveRole() {
        await fetch("/api/save-role?userId=" + viewingUser._id + "&role=" + role)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.warn(err))
        router.reload()
    }

    async function getClients(coachId) {
       const fetchClients = await fetch("/api/get-clients?coachId=" + coachId)
            .then(res => res.json())
            .catch(err => console.warn(err.json()))
        setClients(fetchClients)
        console.log(clients)
    }

    async function terminateCoach(coachId){
        const findCoach = await fetch("/api/terminate-coach?coachId=" + coachId)
            .then(res => res.json())
            .catch(err => console.warn(err))

    }

    useEffect(() => {
        document.getElementById("roleSelect").value = role
    }, [])

    useEffect(() => {
        if(viewingUser.level === "coach"){
            getClients(viewingUser.email).then()
        }
    }, [])

    return (
        <Layout title={viewingUser.name || viewingUser.email} session={user}>
            <Head>
                <title>TTS / User / {viewingUser.name || viewingUser.email}</title>
            </Head>

            <div className={`mt-8 mb-8`}>
                <WorkbookToggle user={viewingUser} setVersion={setVersion}/>
            </div>
            <div className={"bg-gray-100 p-6 mb-5 rounded"}>
                <h2 className={"uppercase text-gray-500 mb-3"}>Personal Details</h2>
                <div className={"flex"}>
                    <div className={"flex-1"}>
                        <div>
                            <p className={"text-gray-500 text-xs"}>Name</p>
                            <p>{viewingUser.name}</p>
                        </div>
                        <p className={"text-gray-500 text-xs"}>Email</p>
                        <p>{viewingUser.email}</p>
                        <p className={"text-gray-500 text-xs mt-4"}>Phone</p>
                        <p>{viewingUser.phone}</p>
                        <p className={"text-gray-500 text-xs mt-4"}>User ID</p>
                        <p>{viewingUser._id}</p>
                        <p className={"text-gray-500 text-xs mt-4"}>County</p>
                        <ul>
                            {viewingUser.county && viewingUser.county.map(county => (
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
                            {viewingUser.programs && viewingUser.programs.map((program, i) => (
                                <li key={i}>{program}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={"bg-gray-100 p-6 mb-5 rounded"}>
                <h2 className={"uppercase text-gray-500"}>Role</h2>
                <div className={`flex`}>
                    <div className={`w-1/3`}>
                        <select id={"roleSelect"} onChange={(e) => {
                            setRole(e.target.value)
                            setRoleChanged(true)
                        }}>
                            <option value={""}>Select a new role...</option>
                            <option value={"client"}>client</option>
                            <option value={"coach"}>coach</option>
                            <option value={"admin"}>admin</option>
                        </select>
                    </div>
                    <div className={`w-1/3`}>
                        {clients && clients.map((client, i) => (
                            <li key={i}>{client.email}</li>
                        ))}
                    </div>
                    <div className={`w-1/3`}>
                        <button className={`${viewingUser.level === 'coach' ? '' : 'hidden' } py-2 px-6 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400`}
                        onClick={() => {
                            terminateCoach(viewingUser.email).then()
                        }}>Terminate Coach</button>
                    </div>
                </div>


                <div className={"flex justify-start mt-4 pt-4 border-t-[1px] border-gray-400"}>
                    <button disabled={!roleChanged}
                            onClick={saveRole}
                            className={"py-2 px-6 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>Save
                        role updates
                    </button>
                </div>
            </div>
            <CoachAssignments coachesJson={coachesJson} viewingUser={viewingUser}/>
            <NewEmailAssignment user={viewingUser.email}/>

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

    // viewing user data
    const userUrl = baseUrl + "/api/get-user?userId=" + context.query.userId
    const getViewingUser = await fetch(userUrl)
    const viewingUserJson = await getViewingUser.json()

    // all coaches data
    const coachesUrl = baseUrl + "/api/get-all-coaches"
    const getCoaches = await fetch(coachesUrl)
    const coachesJson = await getCoaches.json()

    return {
        props: {
            pageDataJson, coachesJson,
            viewingUser: viewingUserJson,
        }
    }

}
