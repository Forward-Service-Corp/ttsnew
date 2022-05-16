import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import { lasList } from "../lib/lasList"

export default function Dreams({user, dreams}) {
    const domainKeys = Object.keys(lasList)
    return (
        <Layout title={"Life Area Surveys"} session={user}>
            <select>
                <option>Select a dream...</option>
                {dreams.map((dream, i) => (
                    <option key={i}>{dream.dream}</option>
                ))}
            </select>
            {domainKeys.map(key =>
                (
                    <div key={key}>
                        <p>{lasList[key].label}</p>
                        <select className={"overflow-hidden max-w-[300px]"}>
                            <option className={"whitespace-pre-wrap"}>{lasList[key].statements[0]}</option>
                            <option className={"whitespace-pre-wrap"}>{lasList[key].statements[1]}</option>
                            <option className={"whitespace-pre-wrap"}>{lasList[key].statements[2]}</option>
                            <option className={"whitespace-pre-wrap"}>{lasList[key].statements[3]}</option>
                            <option className={"whitespace-pre-wrap"}>{lasList[key].statements[4]}</option>
                            <option className={"whitespace-pre-wrap"}>{lasList[key].statements[5]}</option>
                        </select>
                    </div>
                ))}
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

    // fetch user data
    const getUser = await fetch(url)

    // cast user data to json
    const userJson = await getUser.json()

    //dreams url
    const getUserDreamsUrl = baseUrl + "/api/get-user-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    return {
        props: {
            user: userJson,
            dreams: dreamsJson
        }
    }

}

