import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";
import Head from "next/head";
import {useEffect, useState} from "react";

export default function User({viewingUser, pageDataJson, coachesJson}) {

    const router = useRouter()
    const {user} = pageDataJson
    const [role, setRole] = useState(viewingUser.level)
    const [roleChanged, setRoleChanged] = useState(false)
    const [newCoaches, setNewCoaches] = useState(viewingUser.coach || [])
    const [dataChanged, setDataChanged] = useState(false)

    async function saveRole() {
        await fetch("/api/save-role?userId=" + viewingUser._id + "&role=" + role)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.warn(err))
        router.reload()
    }

    async function saveCoaches() {
        await fetch("/api/save-coaches", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: viewingUser._id,
                coaches: newCoaches
            })
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => console.warn(err))
        router.reload()
    }

    useEffect(() => {
        document.getElementById("roleSelect").value = role
    }, [])

    return (
        <Layout title={viewingUser.name} session={user}>
            <Head>
                <title>TTS / User / {viewingUser.name}</title>
            </Head>
            <div>
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
            <div className={"py-6"}>
                <h2 className={"uppercase text-gray-500"}>Role</h2>
                <select id={"roleSelect"} onChange={(e) => {
                    setRole(e.target.value)
                    setRoleChanged(true)
                }}>
                    <option value={""}>Select a new role...</option>
                    <option value={"client"}>client</option>
                    <option value={"coach"}>coach</option>
                    <option value={"admin"}>admin</option>
                </select>
                <button disabled={!roleChanged}
                        onClick={saveRole}
                        className={" ml-3 py-2 px-6 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>Save
                    role updates
                </button>
            </div>
            <div className={"bg-gray-200 p-6 mb-5 rounded"}>
                <h2 className={"uppercase text-gray-500"}>Coach Assignments</h2>
                {coachesJson && coachesJson.sort((a, b) => b.name - a.name).map(coach => {
                    return (
                        <div key={coach.email} className={"p-1"}>
                            <input className={"mr-1"}
                                   defaultChecked={newCoaches && newCoaches.indexOf(coach.email) > -1}
                                   onChange={(e) => {
                                       if (newCoaches && newCoaches.indexOf(e.target.value) === -1) {
                                           setNewCoaches(prevState => [...prevState, e.target.value])
                                       } else {
                                           setNewCoaches(prevState => prevState.filter(coach => coach !== e.target.value))
                                       }
                                       setDataChanged(true)
                                   }}
                                   value={coach.email}
                                   type={"checkbox"}
                                   id={coach.email}
                                   name={coach.name}/>
                            <label htmlFor={coach.email}>{coach.name}</label>
                        </div>
                    )
                })}
            </div>
            <div>
                <div className={"flex justify-end"}>
                    <button disabled={!dataChanged}
                            onClick={saveCoaches}
                            className={"py-2 px-6 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>Save
                        coach updates
                    </button>
                </div>
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
