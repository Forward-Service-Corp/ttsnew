import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";
import {labelMap} from "../../lib/serviceLabelsMap";
import {ArrowLeft, Printer} from "phosphor-react";
import {useEffect, useState} from "react";
import moment from "moment";

export default function SurveyId({pageDataJson}) {

    const router = useRouter()
    const {user, surveys} = pageDataJson
    const {surveyId} = router.query
    const {isYouthSurvey} = router.query
    const [userFullName, setUserFullName] = useState("")
    const [isYouth, setIsYouth] = useState('youthDomains')

    const getUserFullName = async () => {
        const currentSurveyUserId = surveys.filter(survey => survey._id.toString() === surveyId.toString())[0].userId
        console.log(currentSurveyUserId)
        const data = await fetch(`/api/pages/getSurveyName?userId=${currentSurveyUserId}`)
            .then(res => res.json())
        console.log(data.surveyUser.name)
        await setUserFullName(data.surveyUser.name)
    }

    const getIsYouth = (survey) => {
        if(isYouthSurvey === 'true'){
            return youthDomains.map((domain, domainIndex) => {
                return (
                    <div key={domainIndex} className={`p-1 ${survey.priority.indexOf(domain) > -1 ? "border border-1 border-black" : null}`}>
                        <div className={"flex items-center justify-between"}>
                            <div className={"truncate font-bold"}>{labelMap[domain]}</div>
                            <div className={""}>{survey[domain][0]}</div>
                        </div>
                        <p>{survey[domain][1]}</p>
                    </div>
                )
            })
        }else{
            return  domains.map((domain, domainIndex) => {
                return (
                    <div key={domainIndex} className={`p-1 ${survey.priority.indexOf(domain) > -1 ? "border border-1 border-black" : null}`}>
                        <div className={"flex items-center justify-between"}>
                            <div className={"truncate font-bold"}>{labelMap[domain]}</div>
                            <div className={""}>{survey[domain][0]}</div>
                        </div>
                        <p>{survey[domain][1]}</p>
                    </div>
                )
            })
        }

    }

    useEffect(()=> {
        getUserFullName().then()
    },[])

    // useEffect(()=>{
    //     getIsYouth().then()
    // },[])

    const domains = [
        "adultEducation",
        "budgeting",
        "childcare",
        "childrensEducation",
        "communityInvolvement",
        "disabilities",
        "familyFriendsSupport",
        "food",
        "healthInsurance",
        "housing",
        "internetAccess",
        "legal",
        "lifeSkills",
        "mentalHealth",
        "money",
        "parentingSkills",
        "racismBigotry",
        "safety",
        "substances",
        "transportation",
        "employment"
    ]

    const youthDomains = [
        "food",
        "housing",
        "safety",
        "friends",
        "myFamily",
        "school",
        "work",
        "money",
        "transportation",
        "familyCare",
        "mentalHealth",
        "substances",
        "disabilities",
        "lifeSkills",
        "healthCare",
        "manageMoney",
        "legal",
        "internetAccess",
        "education",
        "parenting",
        "childrensEducation"
    ]

    const questions = [
        {
            value: "surprise",
            question: "Did any answers surprise you?"
        },
        {
            value: "concern",
            question: "Did any areas concern you?"
        }, {
            value: "family",
            question: "Are any of these areas affecting your family?"
        }, {
            value: "health",
            question: "Are any of these areas affecting your health?"
        }, {
            value: "income",
            question: "Are any of these areas affecting your income?"
        }

    ]

    return (
        <Layout title={"Review Life Area Survey"} session={user}>
            {surveys.filter(survey => survey._id.toString() === surveyId.toString()).map(survey => {
                return (
                    <div key={survey._id} className={""}>
                        <div className={"flex justify-between print:hidden"}>
                            <button
                                onClick={() => router.back()}
                                className={"py-2 px-6 text-white text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 flex items-center"}>
                                <span className={"inline-block mr-2"}><ArrowLeft size={22} /></span><span className={"inline-block"}>Back</span>

                            </button>
                            <button
                                onClick={() => window.print()}
                                className={"py-2 px-6 text-white text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 flex items-center max-w-[180px]"}>
                                <span className={"inline-block mr-2"}><Printer size={22} /></span><span className={"inline-block"}>Print</span>
                            </button>
                        </div>
                        <div className={"flex justify-between p-2 text-sm mb-4"}>
                            <div>
                                <p>Client name: {userFullName}</p>
                                <p>Client email: {survey.userId}</p>
                                <p>Associated dream: {survey.dream}</p>
                                <p>Date taken: {moment(survey.datestamp).calendar() }</p>
                            </div>
                            <div className={"flex flex-col text-right align-baseline"}>

                                <p>Priority life areas: {survey.priority.map(p => {
                                    return (
                                        <span className={"border p-1 ml-1 rounded"} key={p}>{p}</span>
                                    )
                                })}</p>
                            </div>
                        </div>

                        <div className={"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 text-xs gap-6 print:grid-cols-4 print:break-after-page"}>
                            {
                                getIsYouth(survey)
                                // [isYouth].map((domain, domainIndex) => {
                                //     return (
                                //         <div key={domainIndex} className={`p-1 ${survey.priority.indexOf(domain) > -1 ? "border border-1 border-black" : null}`}>
                                //             <div className={"flex items-center justify-between"}>
                                //                 <div className={"truncate font-bold"}>{labelMap[domain]}</div>
                                //                 <div className={""}>{survey[domain][0]}</div>
                                //             </div>
                                //             <p>{survey[domain][1]}</p>
                                //         </div>
                                //     )
                                // })
                            }

                        </div>
                        <div className={"text-sm divide-y"}>
                            <h2 className={"uppercase text-gray-600 my-4"}>Additional Questions</h2>
                            {
                                questions.map((question, questionIndex) => {
                                    return (
                                        <div key={questionIndex} className={`pb-4 ${survey[question.value] === "" || survey[question.value] === undefined ? "hidden" : "visible"}`}>
                                            <p><strong>{question.question}</strong></p>
                                            <p>{survey[question.value]}</p>
                                        </div>
                                    )
                                })
                            }
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

    // page data
    const pageDataUrl = baseUrl + "/api/pages/indexPageData?userId=" + session.user.email
    const getPageData = await fetch(pageDataUrl)
    const pageDataJson = await getPageData.json()

    return {
        props: {pageDataJson}
    }

}
