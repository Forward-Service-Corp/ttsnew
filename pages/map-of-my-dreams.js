import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {labelMap} from "../lib/serviceLabelsMap";

export default function MapOfMyDreams({user, query, surveys}) {

    const [data, setData] = useState({})
    const [domains, setDomains] = useState([])
    const [currentSurvey, setCurrentSurvey] = useState(surveys.filter(survey => survey._id === query.surveyId))
    const [selectedReferrals, setSelectedReferrals] = useState([])

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

    return (
        <Layout title={"Map of My Dreams"} session={user}>
            <div className={"p-3 border rounded mt-5"}>
                <div className={"flex p-3"}>
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

                <div>
                    {domains.map((domain, i) => {
                        return (
                            <div key={i} className={"mx-1 my-4 border rounded p-3"}>
                                <div className={"text-sm mb-2"}><span
                                    className={"text-gray-500"}>Priority area:</span> {labelMap[domain]}</div>

                                <div className={"flex"}>

                                    <div className={"w-1/2"}>
                                        <select className={"w-full"} onChange={(e) => {
                                            setSelectedReferrals(prevState => prevState.filter(item => item.domain !== domain))

                                            setSelectedReferrals(prevState => [...prevState, {
                                                domain: domain,
                                                referralId: e.target.value,
                                                name: e.target[e.target.selectedIndex].dataset.name,
                                                email: e.target[e.target.selectedIndex].dataset.email,
                                                phone: e.target[e.target.selectedIndex].dataset.phone,
                                                hours: e.target[e.target.selectedIndex].dataset.hours
                                            }])
                                        }}>
                                            <option value={""}></option>
                                            {data.referrals && data.referrals.filter(item => item.service === domain).map((referral, i) => {
                                                return (
                                                    <option key={i} value={referral._id}
                                                            data-name={referral.name}
                                                            data-hours={referral.hours}
                                                            data-phone={referral.contactPhone}
                                                            data-email={referral.contactEmail}>
                                                        {referral.name}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>

                                    <div
                                        className={"w-1/2 ml-10"}>{selectedReferrals && selectedReferrals.filter(item => item.domain === domain).map((referral, i) => {
                                        return (
                                            <div key={i}>
                                                {referral.phone !== undefined ? <div className={"text-xs"}><p className={"font-bold"}>Phone:</p><p>{referral.phone}</p></div> : null}
                                                {referral.email !== undefined ? <div className={"text-xs mt-3"}><p className={"font-bold"}>Email:</p><p>{referral.email}</p></div> : null}
                                                {referral.hours !== undefined ? <div className={"text-xs mt-3"}><p className={"font-bold"}>Hours:</p><p>{referral.hours}</p></div> : null}
                                            </div>
                                        )
                                    })}
                                    </div>

                                </div>
                            </div>
                        )
                    })}
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

    console.log(context)

    // user data
    const url = baseUrl + "/api/get-user?email=" + session.user.email
    const getUser = await fetch(url)
    const userJson = await getUser.json()

    //dreams url
    const getUserDreamsUrl = baseUrl + "/api/get-user-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    //surveys url
    const getUserSurveysUrl = baseUrl + "/api/get-user-surveys?userId=" + userJson._id
    const getSurveys = await fetch(getUserSurveysUrl)
    const surveysJson = await getSurveys.json()

    return {
        props: {
            user: userJson,
            dreams: dreamsJson,
            surveys: surveysJson,
            query: context.query
        }
    }

}

