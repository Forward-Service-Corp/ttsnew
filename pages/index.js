import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link"

export default function Home({user, dreams, surveys}) {
    const stats = [
        { name: 'Dreams', stat: dreams.length, link: "/dreams", label: "Add a dream" },
        { name: 'Life Area Surveys', stat: surveys.length, link: "/life-area-surveys", label: "Complete a survey" },
        { name: 'To-do Completion', stat: '24.57%', link: "/", label: "See all to-dos" },
    ]
    return (
        <Layout title={"Dashboard"} session={user}>
            <div>
                {/*<h3 className="text-lg leading-6 font-medium text-gray-900">Last 30 days</h3>*/}
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                    {stats.map((item) => (
                        <div key={item.name} className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6 text-center">
                            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                            <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
                            <Link href={item.link}><a className={"text-indigo-600 underline text-xs"}>{item.label}</a></Link>
                        </div>
                    ))}
                </dl>
            </div>

            <div className={"p-10 mt-5"}>
                <h1 className={"text-2xl text-cyan-600"}>Welcome to Transition To Success and Map of My Dreams</h1>
                <p className={"mt-5"}>
                    Welcome to Transition To Success&reg; (TTS). This TTS Workbook and Guide is designed specifically
                    for
                    YOU. Together with your Transition To Success (TTS) Coach, you will map your journey to your dreams
                    and
                    work together to make those dreams come true. Just like taking a trip, know where you are going to
                    make
                    sure you get there. Go after what you want. Make your dreams become reality. Mapping Dreams is for
                    everyone, regardless of your age, race, religion, male or female, rich or poor. All of us have
                    dreams.
                </p>

                <h2 className={"my-5 font-bold text-cyan-600"}>How do I make my dreams come true?</h2>
                <p>
                    Just ask anyone, &quot;What&apos;s your dream?&quot;. You will find there are as many dreams as
                    there
                    are people. Having dreams is the easy part. Making your dreams come true is the tough part and
                    requires so much more than just wishing. Making dreams come true requires hope, plans, the ability
                    to ask for
                    help, determination, and money. Making a real plan, designed by you, that will work for you, is the
                    path to your success.
                </p>

                <p className={"mt-5"}>
                    Each step you take brings you one step closer to your dream. Each step is a reason to celebrate.
                    And,
                    when &quot;life happens&quot; and a step suddenly turns into a slip or a fall, YOU start again. Just
                    like a wrong turn on a map, the key is to reroute. DO NOT STOP. Do not turn around. Keep moving.
                    Everyone has missteps, even when moving in the right direction. What really matters is what you do
                    next.
                </p>

                <div className={"p-5 bg-cyan-100 my-5 rounded border border-cyan-400"}>
                    <p className={"font-bold"}>&quot;If at first you don&apos;t succeed try and try again.&quot;</p>
                    <p className={"font-bold text-cyan-600 my-3"}>Did you know –</p>
                    <ul className={"list-disc px-5"}>
                        <li>Michael Jordan did not make the cut for his high school basketball team.</li>
                        <li>Thomas Edison had over 1000 failed attempts at a light bulb.</li>
                        <li>Oprah was told she didn&apos;t have a &quot;face&quot; for television.</li>
                        <li>Dr. Seuss&apos; 1st book was rejected 27 times before it was finally published.</li>
                    </ul>
                </div>
                <p>
                    From now on giving up is not an option. To be the best you, you must embrace the missteps, learn
                    from your mistakes, and re-route. Keep moving, and YOU will get to your destination.
                </p>
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

    // set up variables
    const url =  baseUrl + "/api/get-user?email=" + session.user.email

    // fetch data
    const getUser = await fetch(url)

    // cast data to json
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
            surveys: surveysJson
        }
    }

}

