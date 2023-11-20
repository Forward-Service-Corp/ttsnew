import Layout from "../components/layout"
import {useSession} from "next-auth/react"
import Link from "next/link"
import {useRouter} from "next/navigation";
import Head from "next/head"
import {useState} from "react"
import DashboardMetric from "../components/dashboardMetric";
import WelcomeGroupAdult from "../components/pages/welcomeGroupAdult";
import WelcomeGroupYouth from "../components/pages/welcomeGroupYouth";

export default function Home({pageDataJson, session}) {

    const router = useRouter()
    // const {user, dreams, surveys, referrals, tasks} = pageDataJson
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
            <div className={"p-4 dark:p-0 bg-gray-100 dark:bg-opacity-0"}>
                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                    <DashboardMetric title={"Active dreams"} metric={dreams.filter(dream => dream.status === "active").length} link={"/dreams"} linkLabel={"View dreams"} icon={"Brain"}/>
                    <DashboardMetric title={"Life Area Surveys"} metric={surveys.length} link={"/life-area-surveys"} linkLabel={"View life area surveys"} icon={"ListNumbers"}/>
                    <DashboardMetric title={"Referrals"} metric={referrals.length} link={"/life-area-surveys"} linkLabel={"View all referrals"} icon={"Bookmarks"}/>
                    <DashboardMetric title={"To-Do's"} metric={tasks.filter(task => task.completed !== "true").length} link={"/care-plans"} linkLabel={"View all to-do's"} icon={"CheckSquare"}/>
                </dl>
            </div>
            <div className={"flex justify-between py-8"}>
                <div>
                    <button disabled={currentTab === 1} onClick={prevPage}
                            className={"py-2 px-6 text-white text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 dark:rounded-[7px]"}>Previous
                        page
                    </button>
                </div>
                <div>
                    <button onClick={nextPage}
                            className={"py-2 px-6 text-white text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-600 dark:rounded-[7px]"}>
                        {currentTab === 3 ? "Continue to Dreams" : "Next page"}
                    </button>
                </div>
            </div>
            { !user.isYouth || user.isYouth === false  ? <WelcomeGroupAdult currentTab={currentTab}/> : <WelcomeGroupYouth currentTab={currentTab}/>}
            <div className={`p-4 text-xs border-t-[1px] border-gray-400 mt-8 dark:border-blue-900 dark:text-white`}>
                <p className={`text-lg uppercase`}>Disclaimer</p>
                <p className={`pb-4`}>
                    You are logged into an application owned by Forward Service Corporation. The information
                    collected by this application is protected and will not be sold or shared with any third
                    parties. We will use the data collected to improve our services and understand how people are
                    utilizing our programs. By accessing this site, you consent to FSC using your data in this way.
                </p>
            </div>
        </Layout>
    )
}



