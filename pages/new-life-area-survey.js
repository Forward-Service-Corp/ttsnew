import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import SurveyDomainList from "../components/surveyDomainsList";
import NewLifeAreaSurveyForm from "../components/newLifeAreaSurveyForm";
import {useState} from "react";

export default function NewLifeAreaSurvey({pageDataJson}) {

    const {user} = pageDataJson
    const [activeDomain, setActiveDomain] = useState("food")
    const [answered, setAnswered] = useState({})
    const [domains, setDomains] = useState([])

    return (
        <Layout title={"Life Area Survey"} session={user}>
            <div className={`bg-indigo-600 p-2 rounded text-center text-white text-xs mb-6 ${Object.keys(answered).length === 21 ? "hidden" : null}`}>
                You&apos;ve completed {Object.keys(answered).length} of 21 life areas. Keep going!
            </div>
            <div className={`bg-indigo-600 p-2 rounded text-center text-white text-xs mb-6 ${domains.length > 0 ? "hidden" : null}`}>
                Please select at least one life area as a priority by using the toggle.
            </div>
            <div className={"flex"}>
                <div className={"flex-3"}>
                    <SurveyDomainList setActiveDomain={setActiveDomain} activeDomain={activeDomain}
                                      answered={answered} domains={domains}/>
                </div>
                <div className={"flex-1"}>
                    <NewLifeAreaSurveyForm activeDomain={activeDomain} setAnswered={setAnswered} answered={answered}
                                           domains={domains} setDomains={setDomains}/>
                </div>
            </div>
            <div className={"flex justify-end"}>
                <button disabled={domains.length === 0 || Object.keys(answered).length !== 21}
                        className={"bg-indigo-600 text-white text-sm rounded py-2 px-4 disabled:bg-gray-400"}>Save this
                    survey
                </button>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {

    let dream, dreamId
    if (context.query.dream !== undefined) {
        dream = context.query.dream
        dreamId = context.query.dreamId
    } else {
        dream = ""
        dreamId = ""
    }

    // session check and possible redirect
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}

    // dynamic url setup
    const {req} = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // page data
    const pageDataUrl = baseUrl + "/api/pages/indexPageData?userId=" + session.user.email
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()

    return {
        props: {
            pageDataJson,
            incomingDream: {
                hasDream: context.query.dream !== undefined,
                dream: dream,
                dreamId: dreamId
            }
        }
    }

}
