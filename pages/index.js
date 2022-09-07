import Layout from "../components/layout"
import {getSession} from "next-auth/react"
import Link from "next/link"
import {useRouter} from "next/router";
import Head from "next/head"
import {useState} from "react"
import Welcome1 from "../components/pages/welcome1"
import Welcome2 from "../components/pages/welcome2"
import Welcome3 from "../components/pages/welcome3"
import {Brain, Bookmarks, CheckSquare, ListNumbers} from "phosphor-react";

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
            <div>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                    <div className="rounded overflow-hidden text-center shadow flex flex-col justify-between">
                        <div className={"flex align-middle items-center justify-center text-white bg-gray-700 p-2"}>
                            <Brain size={22}/>
                            <dt className=" font-light uppercase ml-2">Dreams</dt>
                        </div>
                        <dd className="my-4 text-3xl font-semibold ">{dreams.length}</dd>
                        <div className={"flex align-middle items-center justify-center text-white bg-gray-200 p-2"}>
                            <Link href={"/dreams"}>
                                <a className={"text-black text-xs"}>+ add a dream</a>
                            </Link>
                        </div>
                    </div>

                    <div className="rounded overflow-hidden text-center shadow flex flex-col justify-between">
                        <div className={"flex align-middle items-center justify-center text-white bg-gray-700 p-2"}>
                            <ListNumbers size={22}/>
                            <dt className=" font-light uppercase ml-2">Life Area Surveys</dt>
                        </div>
                        <dd className="my-4 text-3xl font-semibold ">{surveys.length}</dd>
                        <div className={"flex align-middle items-center justify-center text-white bg-gray-200 p-2"}>
                            <Link href={"/dreams"}>
                                <a className={"text-black text-xs"}>complete a survey</a>
                            </Link>
                        </div>
                    </div>

                    <div className="rounded overflow-hidden text-center shadow flex flex-col justify-between">
                        <div className={"flex align-middle items-center justify-center text-white bg-gray-700 p-2"}>
                            <Bookmarks size={22}/>
                            <dt className=" font-light uppercase ml-2">Referrals</dt>
                        </div>
                        <dd className="my-4 text-3xl font-semibold ">{referrals.length}</dd>
                        <div className={"flex align-middle items-center justify-center text-white bg-gray-200 p-2"}>
                            <Link href={"/care-plans"}>
                                <a className={"text-black text-xs"}>see referrals</a>
                            </Link>
                        </div>
                    </div>

                    <div className="rounded overflow-hidden text-center shadow flex flex-col justify-between">
                        <div className={"flex align-middle items-center justify-center text-white bg-gray-700 p-2"}>
                            <CheckSquare size={22}/>
                            <dt className=" font-light uppercase ml-2">Tasks</dt>
                        </div>
                        <dd className="my-4 text-3xl font-semibold ">{completedTasks} of {tasks.length}</dd>
                        <div className={"flex align-middle items-center justify-center text-white bg-gray-200 p-2"}>
                            <Link href={"/care-plans"}>
                                <a className={"text-black text-xs"}>+ add a task</a>
                            </Link>
                        </div>
                    </div>

                </dl>
            </div>
            <div className={"flex justify-between py-8"}>
                <div>
                    <button disabled={currentTab === 1} onClick={prevPage}
                            className={"py-2 px-6 text-white text-sm rounded bg-orange-500 disabled:bg-gray-300"}>Previous
                        page
                    </button>
                </div>
                <div>
                    <button onClick={nextPage}
                            className={"py-2 px-6 text-white text-sm rounded bg-orange-500 disabled:bg-gray-300"}>
                        {currentTab === 3 ? "Continue to Dreams" : "Next page"}
                    </button>
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

