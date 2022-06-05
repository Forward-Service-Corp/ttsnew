import {useRouter} from "next/router";
import {labelMap} from "../lib/serviceLabelsMap";
import moment from "moment";

function CompletedLifeAreaSurveys({surveys, setSurveys, user}) {

    const router = useRouter()

    async function deleteSurvey(id) {
        await fetch("/api/delete-survey?surveyId=" + id)
    }

    async function getSurveys() {
        const fetchedSurveys = await fetch("/api/get-surveys?userId=" + user._id)
            .then(res => res.json())
            .catch(err => console.warn(err))
        setSurveys(fetchedSurveys)
    }

    return (
        <div className={"grid grid-cols-1 lg:grid-cols-2"}>
            {surveys.sort((a, b) => new Date(b.datestamp) - new Date(a.datestamp)).map(survey => {
                return (
                    <div className={"rounded shadow mr-5 mb-5 text-sm overflow-hidden relative flex flex-col justify-between"} key={survey.dream}>
                        <div className={"bg-indigo-600 p-3 truncate font-light text-white"}>{moment(survey.datestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
                        <div className={"flex flex-wrap"}>
                            <div className={"flex-grow p-4"}>
                                <div className={"my-2"}>
                                    <p className={"text-xs text-gray-600"}>Priority domains:</p>
                                    <ul className={"list-disc pl-5"}>
                                        {survey.priority.map((item, i) => {
                                            return <li key={i}>{labelMap[item]}</li>
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    <span className={"text-gray-500 text-xs"}>Total Score:</span> {survey.totalScore}
                                </div>

                            </div>
                        </div>
                        <div className={"bg-gray-400 flex text-center text-white text-xs"}>
                            <div className={"bg-indigo-600 p-3 flex-1 cursor-pointer hover:bg-indigo-500"} onClick={() => {
                                router.push({
                                    pathname: "/map-of-my-dreams",
                                    query: {
                                        dreamId: survey.dreamId,
                                        dream: survey.dream,
                                        surveyId: survey._id,
                                        county: user.county,
                                        domain: survey.priority
                                    }
                                })
                            }}>Map this survey</div>
                            <div className={"bg-gray-600 p-3 flex-1 cursor-pointer hover:bg-gray-500"} onClick={() => {
                                router.push("/surveys/" + survey._id)
                            }}>Review</div>
                            <div className={"bg-red-600 p-3 flex-1 cursor-pointer hover:bg-red-500"} onClick={() => {
                                if (confirm("Are you sure you want to delete this survey? This action is permanent.")) {
                                    deleteSurvey(survey._id)
                                        .then(() => {
                                            getSurveys()
                                                .catch(err => console.warn(err))
                                        })
                                        .catch(err => console.warn(err))
                                }
                            }}>Delete
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default CompletedLifeAreaSurveys;
