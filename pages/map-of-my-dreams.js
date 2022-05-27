import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {labelMap} from "../lib/serviceLabelsMap";
import {useRouter} from "next/router";
import CurrentReferral from "../components/currentReferral";
import Link from "next/link";

export default function MapOfMyDreams({user, query, surveys, referrals}) {
    const router = useRouter()
    const [data, setData] = useState({})
    const [domains, setDomains] = useState([])
    const [currentSurvey, setCurrentSurvey] = useState(surveys.filter(survey => survey._id === query.surveyId))
    const [selectedReferrals, setSelectedReferrals] = useState([])
    const [storedReferrals, setStoredReferrals] = useState({})
    const [currentReferral, setCurrentReferral] = useState({})
    const [userReferrals, setUserReferrals] = useState(referrals)

    function removeReferral(domain, name) {
        setStoredReferrals(prevState => ({
            ...prevState,
            [domain]: prevState[domain].filter(item => item.name !== name)
        }))
    }

    async function getUserReferrals() {
        const userReferrals = await fetch("/api/get-referrals?userId=" + user._id + "&surveyId=" + query.surveyId)
            .then(res => res.json())
        await setUserReferrals(userReferrals)
    }

    async function deleteReferral(id) {
        await fetch("/api/delete-referral?referralId=" + id)
    }

    async function saveReferral() {
        const data = await fetch("/api/save-referral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dreamId: query.dreamId,
                surveyId: query.surveyId,
                userId: user._id,
                dream: query.dream,
                domain: currentReferral.domain,
                name: currentReferral.name,
                email: currentReferral.email,
                phone: currentReferral.phone,
                hours: currentReferral.hours,
                requirements: currentReferral.requirements,
                url: currentReferral.url,
                contact: currentReferral.contact,
                needs: currentReferral.needs
            })
        }).then(res => res.json())
    }

    async function getReferrals() {
        const data = await fetch("/api/get-referral-alt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                county: query.county,
                domain: query.domain
            })
        }).then(res => res.json())

        await setData(data)

        if (data.domain && Array.isArray(data.domain)) {
            await setDomains(data.domain)
        } else {
            await setDomains(data.domain.split(" "))
        }
    }

    useEffect(() => {
        getReferrals()
            .then(res => console.log(res))
            .catch(err => console.warn(err))
    }, [])

    if (currentSurvey.length === 0) {
        return (
            <Layout title={"Map of My Dreams"} session={user}>
                Please go to your completed Life Area Surveys page and select a dream to map.
            </Layout>
        )
    }

    return (
        <Layout title={"Map of My Dreams"} session={user}>
            <div className={"p-3"}>
                <div className={"flex p-3 w-full"}>
                    <div className={"flex-1"}>
                        <p className={"text-sm text-gray-600"}>Dream:</p>
                        <p className={"uppercase"}>{currentSurvey[0].dream}</p>
                        <p className={"text-sm text-gray-600 mt-5"}>Score:</p>
                        <p className={"uppercase"}>{currentSurvey[0].totalScore}</p>
                    </div>
                    <div className={"flex-1"}>
                        <p className={"text-sm text-gray-600"}>Survey Completed:</p>
                        <p className={"uppercase"}>{currentSurvey[0].datestamp}</p>
                    </div>
                </div>

                <div className={"p-3 text-sm text-indigo-600"}>Please select a referral for each priority area.</div>

                <div className={"flex"}>
                    <div className={"flex-1"}>
                        {domains.map((domain, i) => {
                            return (
                                <div key={i} className={"mx-1 my-4 border rounded p-3"}>
                                    <div className={"text-sm mb-2"}><span
                                        className={"text-gray-500"}>Priority area:</span> {labelMap[domain]}</div>

                                    <div className={"flex"}>
                                        <div className={"w-full"}>
                                            <select className={"w-full"} onChange={(e) => {
                                                setCurrentReferral({
                                                    domain: domain,
                                                    name: e.target[e.target.selectedIndex].dataset.name,
                                                    email: e.target[e.target.selectedIndex].dataset.email,
                                                    phone: e.target[e.target.selectedIndex].dataset.phone,
                                                    hours: e.target[e.target.selectedIndex].dataset.hours,
                                                    requirements: e.target[e.target.selectedIndex].dataset.requirements,
                                                    url: e.target[e.target.selectedIndex].dataset.url,
                                                    contact: e.target[e.target.selectedIndex].dataset.contact,
                                                    needs: e.target[e.target.selectedIndex].dataset.needs
                                                })
                                            }}>
                                                <option value={""}></option>
                                                {data.referrals && data.referrals.filter(item => item.service === domain).map((referral, i) => {
                                                    return (
                                                        <option key={i} value={referral._id}
                                                                data-name={referral.name}
                                                                data-hours={referral.hours}
                                                                data-phone={referral.contactPhone}
                                                                data-email={referral.contactEmail}
                                                                data-requirements={referral.requirements}
                                                                data-url={referral.url}
                                                                data-contact={referral.contactName}
                                                                data-needs={referral.needs}
                                                        >
                                                            {referral.name}
                                                        </option>
                                                    )
                                                })}
                                            </select>
                                            <button
                                                className={"bg-indigo-600 text-white px-4 py-2 text-xs rounded mt-3 mb-4"}
                                                onClick={() => {
                                                    saveReferral(domain)
                                                        .then(() => {
                                                            getUserReferrals()
                                                            setCurrentReferral({})
                                                        })
                                                }}>+ Save this referral
                                            </button>
                                            <div>
                                                {userReferrals && userReferrals.filter(item => item.domain === domain).map((referral, i) => {
                                                    return (
                                                        <div key={i}><span className={"text-sm"}>{referral.name}</span> - <span
                                                            className={"text-xs underline text-red-600"}
                                                            onClick={() => {
                                                                deleteReferral(referral._id)
                                                                    .then(() => getUserReferrals())
                                                            }}>delete</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <CurrentReferral currentReferral={currentReferral}/>
                </div>
            <Link href={"/care-plans"} passhref>
                <a className={"px-6 py-2 bg-indigo-600 text-xs rounded text-white"}>Go to Care Plans</a>
            </Link>
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

    // user data
    const url = baseUrl + "/api/get-user?email=" + session.user.email
    const getUser = await fetch(url)
    const userJson = await getUser.json()

    //dreams url
    const getUserDreamsUrl = baseUrl + "/api/get-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    // survey data
    const getUserSurveysUrl = baseUrl + "/api/get-surveys?userId=" + userJson._id
    const getSurveys = await fetch(getUserSurveysUrl)
    const surveysJson = await getSurveys.json()

    // referral data
    const getUserReferralsUrl = baseUrl + "/api/get-referrals?userId=" + userJson._id + "&surveyId=" + context.query.surveyId
    const getReferrals = await fetch(getUserReferralsUrl)
    const referralsJson = await getReferrals.json()

    console.log(context.query.surveyId)

    return {
        props: {
            user: userJson,
            dreams: dreamsJson,
            surveys: surveysJson,
            referrals: referralsJson,
            query: context.query
        }
    }

}

