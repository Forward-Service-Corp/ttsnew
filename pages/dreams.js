import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Dreams({user, dreams}) {
    const router = useRouter()
    const [savedDreams, setSavedDreams] = useState([])
    const [dream, setDream] = useState("")
    const [dreamNeed, setDreamNeed] = useState("")
    const [dreamHelp, setDreamHelp] = useState("")

    useEffect(() => {
        setSavedDreams(dreams)
    }, [])

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

    async function deleteDream(id) {
        await fetch("/api/delete-dream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })
        window.location.reload()
    }

    return (
        <Layout title={"Dreams"} session={user}>
            <h2 className={"text-xl uppercase mb-5"}>Define dream</h2>

            <p className={"uppercase mb-2"}>Your dream</p>
            <input className={"w-full rounded"} type={"text"} onChange={(e) => {
                setDream(e.target.value)
            }} value={dream}/>

            <p className={"uppercase mb-2 mt-5"}>What do you need to do to achieve this dream?</p>
            <input className={"w-full rounded"} type={"text"} onChange={(e) => {
                setDreamNeed(e.target.value)
            }} value={dreamNeed}/>

            <p className={"uppercase mb-2 mt-5"}>Whose help do you need to achieve this dream?</p>
            <input className={"w-full rounded"} type={"text"} onChange={(e) => {
                setDreamHelp(e.target.value)
            }} value={dreamHelp}/>

            <button className={"p-2 mt-4 bg-indigo-600 text-white rounded"} onClick={() => {
                saveDream()
                    .then(res => console.log(res))
                    .catch(err => console.warn(err))

                setSavedDreams(prevState => [...prevState, {dream, dreamNeed, dreamHelp}])
                setDream("")
                setDreamNeed("")
                setDreamHelp("")
            }}>Save dream
            </button>

            {savedDreams.length ? <h2 className={"text-xl mt-6 mb-5 uppercase"}>My Dreams</h2> : null}
            {savedDreams.map((dream, i) => (
                <div key={i} className={"mb-4 flex border-b-2"}>
                    <div className={" p-2 flex-2"}>
                        <p><strong>Dream {i + 1}:</strong> {dream.dream}</p>
                        <p><strong>What I need: </strong> {dream.dreamNeed}</p>
                        <p><strong>Who I need to help me is: </strong>{dream.dreamHelp}</p>
                        <div className={"text-red-700 text-sm cursor-pointer max-w-[150px]"} onClick={() => {
                            if (confirm("Are you sure you want to delete this dream?")) {
                                deleteDream(dream._id)
                            }

                        }}>
                            Delete this dream
                        </div>
                    </div>
                    <div className={"align-middle flex-1 p-2 justify-end flex "}>
                        <div className={"self-center text-right "}>
                            <button className={"w-auto block p-2 bg-indigo-700 rounded text-white"}
                            onClick={() => {
                                router.push("/life-area-surveys?dream=" + dream.dream)
                            }}
                            >Complete survey for this dream</button>
                        </div>
                    </div>
                </div>))}
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}
    const {req} = context;

    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // set up variables
    const url = baseUrl + "/api/get-user?email=" + session.user.email

    // fetch user data
    const getUser = await fetch(url)

    // cast user data to json
    const userJson = await getUser.json()

    //dreams url
    const getUserDreamsUrl = baseUrl + "/api/get-user-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    return {
        props: {
            user: userJson,
            dreams: dreamsJson
        }
    }
}

