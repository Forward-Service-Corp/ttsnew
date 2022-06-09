import Layout from "../../../components/layout";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";
import {labelMap} from "../../../lib/serviceLabelsMap";

export default function CarePlan({pageDataJson, surveyJson}) {

    const router = useRouter()
    const {user, surveys} = pageDataJson
    const {surveyId} = router.query

    return (
        <Layout title={"Review Life Area Survey"} session={user}>
            {surveyJson.filter(survey => survey._id.toString() === surveyId.toString()).map(survey => {
                return (
                    <div key={survey._id} className={""}>
                        <div className={"flex justify-between p-2"}>
                            <div>
                                <p>Client ID: {survey.userId}</p>
                                <p>Associated dream: {survey.dream}</p>
                            </div>
                            <div className={"text-right"}>
                                <p>Total score: {survey.totalScore}</p>
                                <p>Priority life areas: {survey.priority.map(p => {
                                    return (
                                        <span className={"border p-1 ml-1 rounded"} key={p}>{p}</span>
                                    )
                                })}</p>
                            </div>
                        </div>

                        <div className={"grid grid-cols-1 md:grid-cols-3 print:grid-cols-3"}>
                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("adultEducation") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["adultEducation"]} </strong></p>
                                <p>Score: {survey.adultEducation[0]}</p>
                                <p>{survey.adultEducation[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("budgeting") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["budgeting"]}</strong></p>
                                <p>Score: {survey.budgeting[0]}</p>
                                <p>{survey.budgeting[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("childcare") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["childcare"]}</strong></p>
                                <p>Score: {survey.childcare[0]}</p>
                                <p>{survey.childcare[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("childrensEducation") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["childrensEducation"]}</strong></p>
                                <p>Score: {survey.childrensEducation[0]}</p>
                                <p>{survey.childrensEducation[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("communityInvolvement") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["communityInvolvement"]}</strong></p>
                                <p>Score: {survey.communityInvolvement[0]}</p>
                                <p>{survey.communityInvolvement[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("disabilities") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["disabilities"]}</strong></p>
                                <p>Score: {survey.disabilities[0]}</p>
                                <p>{survey.disabilities[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("familyFriendsSupport") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["familyFriendsSupport"]}</strong></p>
                                <p>Score: {survey.familyFriendsSupport[0]}</p>
                                <p>{survey.familyFriendsSupport[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("food") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["food"]}</strong></p>
                                <p>Score: {survey.food[0]}</p>
                                <p>{survey.food[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("healthInsurance") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["healthInsurance"]}</strong></p>
                                <p>Score: {survey.healthInsurance[0]}</p>
                                <p>{survey.healthInsurance[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("housing") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["housing"]}</strong></p>
                                <p>Score: {survey.housing[0]}</p>
                                <p>{survey.housing[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("internetAccess") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["internetAccess"]}</strong></p>
                                <p>Score: {survey.internetAccess[0]}</p>
                                <p>{survey.internetAccess[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("legal") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["legal"]}</strong></p>
                                <p>Score: {survey.legal[0]}</p>
                                <p>{survey.legal[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("lifeSkills") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["lifeSkills"]}</strong></p>
                                <p>Score: {survey.lifeSkills[0]}</p>
                                <p>{survey.lifeSkills[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("mentalHealth") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["mentalHealth"]}</strong></p>
                                <p>Score: {survey.mentalHealth[0]}</p>
                                <p>{survey.mentalHealth[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("money") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["money"]}</strong></p>
                                <p>Score: {survey.money[0]}</p>
                                <p>{survey.money[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("parentingSkills") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["parentingSkills"]}</strong></p>
                                <p>Score: {survey.parentingSkills[0]}</p>
                                <p>{survey.parentingSkills[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("racismBigotry") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["racismBigotry"]}</strong></p>
                                <p>Score: {survey.racismBigotry[0]}</p>
                                <p>{survey.racismBigotry[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("safety") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["safety"]}</strong></p>
                                <p>Score: {survey.safety[0]}</p>
                                <p>{survey.safety[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("substances") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["substances"]}</strong></p>
                                <p>Score: {survey.substances[0]}</p>
                                <p>{survey.substances[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("transportation") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["transportation"]}</strong></p>
                                <p>Score: {survey.transportation[0]}</p>
                                <p>{survey.transportation[1]}</p>
                            </div>

                            <div className={`p-2 m-1 rounded ${survey.priority.indexOf("work") > -1 ? "border border-4 border-black" : null}`}>
                                <p><strong>{labelMap["work"]}</strong></p>
                                <p>Score: {survey.work[0]}</p>
                                <p>{survey.work[1]}</p>
                            </div>
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

    const surveyUrl = baseUrl + "/api/get-client-survey?surveyId=" + context.query.surveyId
    const getSurveyData = await fetch(surveyUrl)
    const surveyJson = await getSurveyData.json()

    return {
        props: {pageDataJson, surveyJson}
    }

}
