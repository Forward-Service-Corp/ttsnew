import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useState} from "react";
import {prefixes} from "next/dist/build/output/log";

export default function Profile({user, dreams, surveys}) {
    const [programs, setPrograms] = useState([])

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [zip, setZip] = useState("")
    const [county, setCounty] = useState([])

    const [coach, setCoach] = useState("")
    const [contactName, setContactName] = useState("")
    const [contactNumber, setContactNumber] = useState("")

    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

    const [currentTab, setCurrentTab] = useState("tab1")

    return (
        <Layout title={"Profile"} session={user}>
            <div className={"mb-5"}>
                <div className={"cursor-pointer inline-block pr-6"} data-tabId={"tab1"} onClick={() => {
                    setCurrentTab("tab1")
                }}>Programs
                </div>
                <div className={"cursor-pointer inline-block pr-6"} data-tabId={"tab2"} onClick={() => {
                    setCurrentTab("tab2")
                }}>Personal Details
                </div>
            </div>

            <div className={`${currentTab === "tab1" ? "visible" : "hidden"}`}>
                <div className={"flex"}>
                    <div className={"w-1/2 inline-block"}>
                        <h2 className={"uppercase text-gray-600 font-light mb-3"}>Available Programs</h2>
                        <select className={"h-[240px]"} multiple onChange={(e) => {
                            setPrograms(prevState => {
                                if (programs.indexOf(e.target.value) === -1) {
                                    return [...prevState, e.target.value]
                                } else {
                                    return prevState
                                }
                            })
                        }}>
                            <option>FoodShare, Employment, and Training (FSET)</option>
                            <option>Jobs for America&apos;s Graduates (JAG)</option>
                            <option>Transportation Alliance for New Solutions (TrANS)</option>
                            <option>Road to Livelihood</option>
                            <option>Upward Bound Math Science (UBMS)</option>
                            <option>Upward Bound (UB)</option>
                            <option>Wheels to Work</option>
                            <option>WIOA Adult and Dislocated Worker</option>
                            <option>WIOA Youth</option>
                            <option>Wisconsin Employment Transportation Assistance Program (WETAP)</option>
                            <option>Wisconsin Works (W-2)</option>
                        </select>
                    </div>
                    <div className={" w-1/2 inline-block"}>
                        <h2 className={"uppercase text-gray-600 font-light mb-3"}>Your Selected Programs</h2>
                        <div>
                            {programs.map(program => (
                                <div className={"cursor-pointer"} key={program}
                                     onClick={() => {
                                         setPrograms(prevState => prevState.filter(item => item !== program))
                                     }}>
                                    {program}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                <div className={"w-full"}>
                    <button className={"p-2 bg-indigo-600 text-white rounded mt-4"}>Update programs</button>
                </div>
            </div>

            <div className={`${currentTab === "tab2" ? "visible" : "hidden"}`}>
                <h2 className={"uppercase text-gray-600 font-light mb-3"}>Personal Details</h2>
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
    const url = baseUrl + "/api/get-user?email=" + session.user.email

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

