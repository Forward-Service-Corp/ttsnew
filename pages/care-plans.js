import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useState} from "react";

export default function CarePlans({user, dreams, query}) {
    // const [selectedDream, setSelectedDream] = useState(dreams.filter(dream => dream._id === query.dreamId))
    const selectedDream = dreams.filter(dream => dream._id === query.dreamId)[0]

    console.log(selectedDream.referrals)
    const [todosContainer, setTodosContainer] = useState(selectedDream.referrals)

    return (
        <Layout title={"Care Plans"} session={user}>
            <p>{selectedDream.dream}</p>
            <button onClick={() => {
                setTodosContainer(prevState => ({
                    ...prevState,
                    food: {
                        ...prevState.food,
                        0: {
                            ...prevState.food[0],
                            todos: [
                                ...prevState.food[0].todos,
                                "thing"
                            ]
                        }
                    }
                }))
            }}>Test button
            </button>
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

    //dreams data
    const getUserDreamsUrl = baseUrl + "/api/get-user-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    return {
        props: {
            user: userJson,
            dreams: dreamsJson,
            query: context.query
        }
    }

}

