import Layout from "../../components/layout";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";

export default function CarePlan({pageDataJson}) {

    const router = useRouter()
    const {user, surveys} = pageDataJson
    const {surveyId} = router.query

    return (
        <Layout title={"Review Life Area Survey"} session={user}>
            {surveys.filter(survey => survey._id.toString() === surveyId.toString()).map(survey => {
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
                            <div className={"p-2"}>
                                <p><strong>Adult Education</strong></p>
                                <p>Score: {survey.adultEducation[0]}</p>
                                <p>{survey.adultEducation[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Budgeting</strong></p>
                                <p>Score: {survey.budgeting[0]}</p>
                                <p>{survey.budgeting[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Child Care</strong></p>
                                <p>Score: {survey.childcare[0]}</p>
                                <p>{survey.childcare[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Children&apos;s Education</strong></p>
                                <p>Score: {survey.childrensEducation[0]}</p>
                                <p>{survey.childrensEducation[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Community Involvement</strong></p>
                                <p>Score: {survey.communityInvolvement[0]}</p>
                                <p>{survey.communityInvolvement[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Disabilities</strong></p>
                                <p>Score: {survey.disabilities[0]}</p>
                                <p>{survey.disabilities[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Family and Friends Support</strong></p>
                                <p>Score: {survey.familyFriendsSupport[0]}</p>
                                <p>{survey.familyFriendsSupport[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Food</strong></p>
                                <p>Score: {survey.food[0]}</p>
                                <p>{survey.food[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Health Insurance</strong></p>
                                <p>Score: {survey.healthInsurance[0]}</p>
                                <p>{survey.healthInsurance[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Housing</strong></p>
                                <p>Score: {survey.housing[0]}</p>
                                <p>{survey.housing[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Internet Access</strong></p>
                                <p>Score: {survey.internetAccess[0]}</p>
                                <p>{survey.internetAccess[1]}</p>
                            </div>

                            <div className={"p-2 print:mb-40"}>
                                <p><strong>Legal</strong></p>
                                <p>Score: {survey.legal[0]}</p>
                                <p>{survey.legal[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Life Skills</strong></p>
                                <p>Score: {survey.lifeSkills[0]}</p>
                                <p>{survey.lifeSkills[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Mental Health</strong></p>
                                <p>Score: {survey.mentalHealth[0]}</p>
                                <p>{survey.mentalHealth[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Money</strong></p>
                                <p>Score: {survey.money[0]}</p>
                                <p>{survey.money[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Parenting Skills</strong></p>
                                <p>Score: {survey.parentingSkills[0]}</p>
                                <p>{survey.parentingSkills[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Racism Bigotry</strong></p>
                                <p>Score: {survey.racismBigotry[0]}</p>
                                <p>{survey.racismBigotry[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Safety</strong></p>
                                <p>Score: {survey.safety[0]}</p>
                                <p>{survey.safety[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Substances</strong></p>
                                <p>Score: {survey.substances[0]}</p>
                                <p>{survey.substances[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Transportation</strong></p>
                                <p>Score: {survey.transportation[0]}</p>
                                <p>{survey.transportation[1]}</p>
                            </div>

                            <div className={"p-2"}>
                                <p><strong>Work</strong></p>
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

    return {
        props: {pageDataJson}
    }

}
