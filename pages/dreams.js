import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import SavedDreams from "../components/savedDreams";
import Head from "next/head";

export default function Dreams({user, dreams}) {

    const router = useRouter()
    const [savedDreams, setSavedDreams] = useState(dreams)
    const [dream, setDream] = useState("")
    const [dreamNeed, setDreamNeed] = useState("")
    const [dreamHelp, setDreamHelp] = useState("")
    const [isLoading, setIsLoading] = useState(false)

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
                userId: user._id
            })
        })
    }

    async function getDreams() {
        setIsLoading(true)
        const newDreams = await fetch("/api/get-dreams?userId=" + user._id)
            .then(res => res.json())
        setSavedDreams(newDreams)
    }

    useEffect(() => {
        getDreams()
            .then(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <Layout title={"Dreams"} session={user} loadingState={isLoading}>
            <Head>
                <title>TTS / Dreams</title>
            </Head>
            <h2 className={"text-xl uppercase mb-5"}>Define a new dream</h2>

            <p className={"uppercase mb-2 text-sm text-gray-500"}>Your dream</p>
            <input className={"w-full rounded"} type={"text"} onChange={(e) => {
                setDream(e.target.value)
            }} value={dream}/>

            <p className={"uppercase mb-2 mt-5 text-sm text-gray-500"}>What do you need to do to achieve this dream?</p>
            <input className={"w-full rounded"} type={"text"} onChange={(e) => {
                setDreamNeed(e.target.value)
            }} value={dreamNeed}/>

            <p className={"uppercase mb-2 mt-5 text-sm text-gray-500"}>Whose help do you need to achieve this dream?</p>
            <input className={"w-full rounded"} type={"text"} onChange={(e) => {
                setDreamHelp(e.target.value)
            }} value={dreamHelp}/>

            <button className={"p-2 mt-4 bg-indigo-700 text-white rounded text-xs"} onClick={() => {
                setIsLoading(true)
                saveDream()
                    .then(() => {
                        getDreams().then(res => console.log(res)).catch(err => console.warn(err))
                    })
                    .then(() => {
                        setIsLoading(false)
                    })
                    .catch(err => console.warn(err))
                setDream("")
                setDreamNeed("")
                setDreamHelp("")
            }}>Save dream
            </button>
            <SavedDreams savedDreams={savedDreams} setLoadingState={setIsLoading} saveDreams={setSavedDreams} user={user}/>
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

    return {
        props: {
            user: userJson,
        }
    }
}

