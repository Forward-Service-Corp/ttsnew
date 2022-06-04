import Layout from "../components/layout";
import {getSession} from "next-auth/react";
import {useState} from "react";
import ProfilePrograms from "../components/profilePrograms";
import ProfilePersonalDetails from "../components/profilePersonalDetails";

export default function Profile({user}) {

    const [coach, setCoach] = useState("")
    const [contactName, setContactName] = useState("")
    const [contactNumber, setContactNumber] = useState("")

    const [currentTab, setCurrentTab] = useState("tab1")

    return (
        <Layout title={"Profile"} session={user}>
            <div className={"mb-5 border-b-2 border-b-gray-300 flex flex-col md:flex-row lg:flex-row "}>
                <div className={`cursor-pointer inline-block px-3 py-2 ${currentTab === "tab1" ? "border-b-2 border-b-orange-500" : ""}`} onClick={() => {
                    setCurrentTab("tab1")
                }}>Programs
                </div>
                <div className={`cursor-pointer inline-block px-3 py-2 ${currentTab === "tab2" ? "border-b-2 border-b-orange-500" : ""}`} onClick={() => {
                    setCurrentTab("tab2")
                }}>Personal Details
                </div>
                <div className={`cursor-pointer inline-block px-3 py-2 ${currentTab === "tab3" ? "border-b-2 border-b-orange-500" : ""}`} onClick={() => {
                    setCurrentTab("tab3")
                }}>Organization Information
                </div>
            </div>

            <div className={`${currentTab === "tab1" ? "visible" : "hidden"}`}>
                <ProfilePrograms user={user}/>
            </div>

            <div className={`${currentTab === "tab2" ? "visible" : "hidden"}`}>
                <ProfilePersonalDetails user={user}/>
            </div>

            <div className={`${currentTab === "tab3" ? "visible" : "hidden"}`}>
                <h2 className={"uppercase text-gray-600 font-light mb-3"}>Organization Information</h2>
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
    const getUserDreamsUrl = baseUrl + "/api/get-dreams?userId=" + userJson._id
    const getDreams = await fetch(getUserDreamsUrl)
    const dreamsJson = await getDreams.json()

    //surveys url
    const getUserSurveysUrl = baseUrl + "/api/get-surveys?userId=" + userJson._id
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

