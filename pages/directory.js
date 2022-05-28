import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import Link from "next/link"
import {useEffect, useState} from "react";
import Head from "next/head";

export default function Home({user, dreams, surveys, referrals, tasks}) {
    const completedTasks = tasks.filter(task => eval(task.completed) === true ).length

    const stats = [
        { name: 'Dreams', stat: dreams.length, link: "/dreams", label: "Add a dream" },
        { name: 'Life Area Surveys', stat: surveys.length, link: "/life-area-surveys", label: "Complete a survey" },
        { name: 'Referrals', stat: referrals.length, link: "/care-plans", label: "View all" },
        { name: 'To-Do List', stat: completedTasks + " of " + tasks.length, link: "/", label: "Completed" },
    ]


    return (
        <Layout title={"Directory"} session={user}>
            <Head>
                <title>TTS / Directory</title>
            </Head>
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
    const getUserDreamsUrl = baseUrl + "/api/get-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

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
            dreams: dreamsJson,
            surveys: surveysJson,
            referrals: referralsJson,
            tasks: tasksJson
        }
    }

}

