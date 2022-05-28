import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useState} from "react";
import Link from "next/link";
import Head from "next/head";

export default function CarePlans({user, referrals, tasks, surveys}) {

    return (
        <Layout title={"Care Plans"} session={user}>
            <Head>
                <title>TTS / Care Plans</title>
            </Head>
            <h2 className={"uppercase text-gray-500 mb-4"}>Manage Care Plans</h2>
            {surveys.map(survey => {
                return (
                    <div className={"rounded border mb-3 shadow flex overflow-hidden"} key={survey._id}>
                        <div className={"flex-1 p-3 "}>
                            <p>{survey.dream}</p>
                            <Link passhref href={"/care-plan/" + survey._id}>
                                <a className={"text-indigo-600 underline text-xs"}>Manage this care plan</a>
                            </Link>
                        </div>
                        <div className={"bg-indigo-500 text-white py-3 px-6 text-center text-xs"}>
                            <p>To-do items:</p>
                            <p className={"text-xl"}>{tasks.filter(task => task.surveyId === survey._id).length}</p>
                        </div>
                        <div className={"bg-indigo-600 text-white py-3 px-6 text-center text-xs"}>
                            <p>Total referrals:</p>
                            <p className={"text-xl"}>{referrals.filter(referral => referral.surveyId === survey._id).length}</p>
                        </div>
                    </div>
                )
            })}
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

    // survey data
    const getUserSurveysUrl = baseUrl + "/api/get-surveys?userId=" + userJson._id
    const getSurveys = await fetch(getUserSurveysUrl)
    const surveysJson = await getSurveys.json()

    // referral data
    const getUserReferralsUrl = baseUrl + "/api/get-referrals?userId=" + userJson._id
    const getReferrals = await fetch(getUserReferralsUrl)
    const referralsJson = await getReferrals.json()

    // tasks data
    const getTasksUrl = baseUrl + "/api/get-all-tasks?userId=" + userJson._id
    const getTasks = await fetch(getTasksUrl)
    const tasksJson = await getTasks.json()

    return {
        props: {
            user: userJson,
            referrals: referralsJson,
            surveys: surveysJson,
            tasks: tasksJson,
            query: context.query
        }
    }

}

