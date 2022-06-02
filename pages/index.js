import Layout from "../components/layout"
import {getSession} from "next-auth/react"
import Link from "next/link"
import {useRouter} from "next/router";
import Head from "next/head"
import {useState} from "react"
import Welcome1 from "../components/pages/welcome1"
import Welcome2 from "../components/pages/welcome2"
import Welcome3 from "../components/pages/welcome3"

export default function Home({pageDataJson}) {

    const router = useRouter()
    const {user, dreams, surveys, referrals, tasks} = pageDataJson
    const completedTasks = tasks.filter(task => eval(task.completed) === true).length
    const [currentTab, setCurrentTab] = useState(1)

    const stats = [
        {name: 'Dreams', stat: dreams.length, link: "/dreams", label: "Add a dream"},
        {name: 'Life Area Surveys', stat: surveys.length, link: "/life-area-surveys", label: "Complete a survey"},
        {name: 'Referrals', stat: referrals.length, link: "/care-plans", label: "View all"},
        {name: 'To-Do List', stat: completedTasks + " of " + tasks.length, link: "/", label: "Completed"},
    ]

    function prevPage() {
        setCurrentTab(prevState => prevState - 1)
    }

    function nextPage() {
        if(currentTab === 3){
            router.push("/dreams")
        }else{
            setCurrentTab(prevState => prevState + 1)

        }
    }

    return (
        <Layout title={"Dashboard"} session={user}>
            <Head>
                <title>TTS / Dashboard</title>
            </Head>
            <div>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
                    {stats.map((item) => (
                        <div key={item.name}
                             className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 text-center">
                            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
                            <Link href={item.link}><a
                                className={"text-indigo-600 underline text-xs"}>{item.label}</a></Link>
                        </div>
                    ))}
                </dl>
            </div>
            <div className={"flex justify-between py-8"}>
                <div>
                    <button disabled={currentTab === 1} onClick={prevPage}
                            className={"py-2 px-6 text-white text-sm rounded bg-indigo-700 disabled:bg-gray-300"}>Previous
                        page
                    </button>
                </div>
                <div>
                    <button onClick={nextPage}
                            className={"py-2 px-6 text-white text-sm rounded bg-indigo-700 disabled:bg-gray-300"}>{currentTab === 3 ? "Continue to Dreams" : "Next page"}</button>
                </div>
            </div>
            <div className={currentTab === 1 ? "visible" : "hidden"}>
                <Welcome1/>
            </div>
            <div className={currentTab === 2 ? "visible" : "hidden"}>
                <Welcome2/>
            </div>
            <div className={currentTab === 3 ? "visible" : "hidden"}>
                <Welcome3/>
            </div>
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

