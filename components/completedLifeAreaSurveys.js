import {useRouter} from "next/router";
import {labelMap} from "../lib/serviceLabelsMap";
import {useState} from "react";

function CompletedLifeAreaSurveys({surveys, setSurveys, user, dream, dreamId}) {

    const router = useRouter()

    async function deleteSurvey (id) {
        console.log(id)
        await fetch("/api/delete-survey?surveyId=" + id)
    }

    async function getSurveys () {
        const fetchedSurveys = await fetch("/api/get-surveys?userId=" + user._id)
            .then(res => res.json())
            .catch(err => console.warn(fetchedSurveys))
        console.log(fetchedSurveys)
        setSurveys(fetchedSurveys)
    }

    return (
        <div className={""}>
            {surveys.sort((a, b) => new Date(b.datestamp) - new Date(a.datestamp)).map(survey => {
                return (
                    <div className={"rounded p-4 shadow mr-5 mb-5 text-sm"} key={survey.dream}>
                        <div className={"flex"}>
                            <div className={"w-2/3"}>

                                <p className={"text-xs text-gray-600"}>Dream:</p>
                                <p>{survey.dream}</p>

                                {/*<p className={"text-xs text-gray-600 mt-3"}>What you need:</p>*/}
                                {/*<p>{dream.dreamNeed}</p>*/}

                                {/*<p className={"text-xs text-gray-600 mt-3"}>Whose help you need:</p>*/}
                                {/*<p>{dream.dreamHelp}</p>*/}

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
                                <div>
                                    <span className={"text-gray-500 text-xs"}>Completed on:</span>
                                    <p>{survey.datestamp}</p>
                                </div>
                            </div>
                            <div className={"text-right w-1/3 border-l-2 border-l-gray-100"}>
                                <div>
                                    <p>
                                        <button
                                            className={"text-xs text-white bg-indigo-600 rounded px-4 py-2 cursor-pointer mb-3"}
                                            onClick={() => {
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
                                            }}>Map this Life Area Survey
                                        </button>
                                    </p>
                                    <p>
                                        <button
                                            className={"text-xs text-white bg-red-600 rounded px-4 py-2 cursor-pointer"}
                                            onClick={() => {
                                                if (confirm("Are you sure you want to delete this survey? This action is permanent.")) {
                                                    deleteSurvey(survey._id)
                                                        .then(() => {
                                                            getSurveys()
                                                                .catch(err => console.warn(err))
                                                        })
                                                        .catch(err => console.warn(err))
                                                }
                                            }}>Delete this survey
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                )
            })}
        </div>
    );
}

export default CompletedLifeAreaSurveys;
