import Layout from "../components/layout";
import {getSession} from "next-auth/react";

import LifeAreaSurveyForm from "../components/lifeAreaSurveyForm";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function LifeAreaSurveys({user, dreams, incomingDream, lifeAreaSurveys}) {
    const [currentDream, setCurrentDream] = useState("")
    const [currentTab, setCurrentTab] = useState("tab1")
    const router = useRouter()

    useEffect(() => {
        if (incomingDream.hasDream) {
            setCurrentDream(incomingDream.dream)
        }
    }, [])


    const hasCurrentDreamJSX = () => {
        return (
            <div>
                <h2>{currentDream}</h2>
                <LifeAreaSurveyForm user={user} currentDream={currentDream}/>
            </div>
        )
    }

    const dreamOptionsJSX = () => {
        return (
            dreams.length > 0 ?
                <>
                    <select onChange={(e) => {
                        setCurrentDream(e.target.value)
                    }}>
                        <option>Select a dream...</option>
                        {dreams.map((dream, i) => (
                            <option key={i} value={dream.dream}>{dream.dream}</option>
                        ))}
                    </select>
                    <LifeAreaSurveyForm user={user} currentDream={currentDream}/>
                </>
                :
                <p>You need to enter at least 1 dream to proceed <Link href={"/dreams"} passhref>
                    <a className={"text-indigo-600 underline"}>
                        Click here to enter a dream.
                    </a>
                </Link>
                </p>

        )
    }

    async function deleteSurvey (id) {
        await fetch("/api/delete-survey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })
        router.reload()
    }

    return (
        <Layout title={"Life Area Surveys"} session={user}>
            <div className={"mb-5 border-b-2 border-b-gray-500-300"}>
                <div
                    className={`cursor-pointer inline-block px-6 py-2 ${currentTab === "tab1" ? "border-b-2 border-b-orange-500" : ""}`}
                    onClick={() => {
                        setCurrentTab("tab1")
                    }}>New Life Area Survey
                </div>
                <div
                    className={`cursor-pointer inline-block px-6 py-2 ${currentTab === "tab2" ? "border-b-2 border-b-orange-500" : ""}`}
                    onClick={() => {
                        setCurrentTab("tab2")
                    }}>Completed Life Area Surveys
                </div>
            </div>
            <div className={`${currentTab === "tab1" ? "visible" : "hidden"}`}>
                {incomingDream.hasDream ?
                    hasCurrentDreamJSX()
                    :
                    dreamOptionsJSX()
                }
            </div>
            <div className={`${currentTab === "tab2" ? "visible" : "hidden"}`}>
                <h2 className={"uppercase text-gray-500"}>Completed Life Area Surveys</h2>
                {lifeAreaSurveys.map((survey, i) => {
                    return (
                        <div key={i} className={"flex justify-between p-3 rounded border my-3"}>
                            <div className={"text-sm"}>
                                <div className={"uppercase text-lg text-indigo-600"}>{survey.dream}</div>
                                <div className={"my-2"}>
                                    Priority Domains
                                    <ul className={"list-disc pl-5"}>
                                        {survey.priority.map((item, i) => {
                                            return <li key={i}>{item}</li>
                                        })}
                                    </ul>
                                </div>
                                <div><span className={"text-gray-500"}>Total Score:</span> {survey.totalScore}</div>
                                <div>Completed on: {survey.datestamp}</div>
                            </div>

                            <div>
                                <div className={"underline text-sm text-indigo-600 cursor-pointer"} onClick={() => {
                                    router.push({
                                        pathname: "/map-of-my-dreams",
                                        query: {
                                            surveyId: survey._id,
                                            county: user.county,
                                            domain: survey.priority
                                        }
                                    })
                                }}>Map this Dream</div>
                                <div className={"underline text-sm text-red-600 cursor-pointer"} onClick={() => {
                                    if(confirm("Are you sure you want to delete this survey? This action is permanent.")){
                                        deleteSurvey(survey._id)
                                            .then(res => console.log(res))
                                            .catch(err => console.warn(err))
                                    }
                                }}>Delete this survey</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    console.log(context.query.dream === undefined)
    let dream
    if (context.query.dream !== undefined) {
        dream = context.query.dream
    } else {
        dream = ""
    }

    // session check and possible redirect
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}

    // dynamic url setup
    const {req} = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // user data
    const url = baseUrl + "/api/get-user?email=" + session.user.email
    const getUser = await fetch(url)
    const userJson = await getUser.json()

    // dreams data
    const getUserDreamsUrl = baseUrl + "/api/get-user-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    // survey data
    const getUserSurveysUrl = baseUrl + "/api/get-user-surveys?userId=" + userJson._id
    const getSurveys = await fetch(getUserSurveysUrl)
    const surveysJson = await getSurveys.json()

    return {
        props: {
            user: userJson,
            dreams: dreamsJson,
            incomingDream: {
                hasDream: context.query.dream !== undefined,
                dream: dream
            },
            lifeAreaSurveys: surveysJson
        }
    }

}

