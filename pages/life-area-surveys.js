import Layout from "../components/layout";
import {getSession} from "next-auth/react";

import LifeAreaSurveyForm from "../components/lifeAreaSurveyForm";
import Link from "next/link";
import {useEffect, useState} from "react";

export default function LifeAreaSurveys({user, dreams, incomingDream}) {
    const [currentDream, setCurrentDream] = useState("")

    useEffect(() => {
        if(incomingDream.hasDream){
            setCurrentDream(incomingDream.dream)
        }
    },[])



    const hasCurrentDreamJSX = () => {
        return (
            <div>
            <h2>{currentDream}</h2>
                <LifeAreaSurveyForm user={user} currentDream={currentDream}/>
            </div>
        )
    }

    const dreamOptionsJSX = () => {
        return (
            dreams.length > 0 ?
                <>
                    <select onChange={(e) => {
                        setCurrentDream(e.target.value)
                    }}>
                        <option>Select a dream...</option>
                        {dreams.map((dream, i) => (
                            <option key={i} value={dream.dream}>{dream.dream}</option>
                        ))}
                    </select>
                    <LifeAreaSurveyForm user={user} currentDream={currentDream}/>
                </>
                :
                <p>You need to enter at least 1 dream to proceed <Link href={"/dreams"} passhref>
                    <a className={"text-indigo-600 underline"}>
                        Click here to enter a dream.
                    </a>
                </Link>
                </p>

        )
    }


    return (
        <Layout title={"Life Area Surveys"} session={user}>

            {incomingDream.hasDream ?

                hasCurrentDreamJSX()

                :

                dreamOptionsJSX()
            }


        </Layout>
    )
}

export async function getServerSideProps(context) {
    console.log(context.query.dream === undefined)
    let dream
    if (context.query.dream !== undefined) {
        dream = context.query.dream
    } else {
        dream = ""
    }

    // session check and possible redirect
    const session = await getSession(context)
    if (!session) return {redirect: {destination: "/login", permanent: false}}

    // dynamic url setup
    const {req} = context;
    const protocol = req.headers['x-forwarded-proto'] || 'http'
    const baseUrl = req ? `${protocol}://${req.headers.host}` : ''

    // user data
    const url = baseUrl + "/api/get-user?email=" + session.user.email
    const getUser = await fetch(url)
    const userJson = await getUser.json()

    // dreams data
    const getUserDreamsUrl = baseUrl + "/api/get-user-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    return {
        props: {
            user: userJson,
            dreams: dreamsJson,
            incomingDream: {
                hasDream: context.query.dream !== undefined,
                dream: dream
            }
        }
    }

}

