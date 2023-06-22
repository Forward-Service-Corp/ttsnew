import Layout from "../components/layout"
import {getSession} from "next-auth/react"
import Link from "next/link"
import {useRouter} from "next/router";
import Head from "next/head"
import {useState} from "react"
import DashboardMetric from "../components/dashboardMetric";
import WelcomeGroupAdult from "../components/pages/welcomeGroupAdult";
import WelcomeGroupYouth from "../components/pages/welcomeGroupYouth";

export default function Home({pageDataJson}) {

    const router = useRouter()
    const {user, dreams, surveys, referrals, tasks} = pageDataJson
    const completedTasks = tasks.filter(task => eval(task.completed) === true).length
    const [currentTab, setCurrentTab] = useState(1)

    function prevPage() {
        setCurrentTab(prevState => prevState - 1)
    }

    function nextPage() {
        if (currentTab === 3) {
            router.push("/dreams")
        } else {
            setCurrentTab(prevState => prevState + 1)
        }
    }

    return (
        <Layout title={"Dashboard"} session={user}>
            <Head>
                <title>TTS / Dashboard</title>
            </Head>
            <div className={"p-4 bg-gray-100"}>
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                    <DashboardMetric title={"Active dreams"} metric={dreams.filter(dream => dream.status === "active").length} link={"/dreams"} linkLabel={"View dreams"} icon={"Brain"}/>
                    <DashboardMetric title={"Life Area Surveys"} metric={surveys.length} link={"/life-area-surveys"} linkLabel={"View life area surveys"} icon={"ListNumbers"}/>
                    <DashboardMetric title={"Referrals"} metric={referrals.length} link={"/life-area-surveys"} linkLabel={"View all referrals"} icon={"Bookmarks"}/>
                    <DashboardMetric title={"To-Do's"} metric={tasks.length} link={"/care-plans"} linkLabel={"View all to-do's"} icon={"CheckSquare"}/>
                </dl>
            </div>
            <div className={"flex justify-between py-8"}>
                <div>
                    <button disabled={currentTab === 1} onClick={prevPage}
                            className={"py-2 px-6 text-white text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"}>Previous
                        page
                    </button>
                </div>
                <div>
                    <button onClick={nextPage}
                            className={"py-2 px-6 text-white text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300"}>
                        {currentTab === 3 ? "Continue to Dreams" : "Next page"}
                    </button>
                </div>
            </div>
            { !user.isYouth || user.isYouth === false  ? <WelcomeGroupAdult currentTab={currentTab}/> : <WelcomeGroupYouth currentTab={currentTab}/>}

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
    const pageDataUrl = baseUrl + "/api/pages/indexPageData?userId=" + session.user.email
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()

    return {
        props: {pageDataJson}
    }

}

