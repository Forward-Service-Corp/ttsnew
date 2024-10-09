import {useRouter} from "next/router";
import {labelMap} from "../lib/serviceLabelsMap";
import moment from "moment";
import {ListNumbers, Link, NotePencil} from "phosphor-react";
import React from "react";

function LasCurrent({surveys, user, isClientSurvey, clientId}) {

    const router = useRouter()

    return (
        <div className={"grid grid-cols-1 lg:grid-cols-2"}>
            {surveys.sort((a, b) => new Date(b.datestamp) - new Date(a.datestamp)).map((survey, i) => {
                if (i === 0) {
                    return (
                        <div className={"mb-4 flex flex-col shadow-xl justify-between bg-white rounded-lg overflow-x-hidden"} key={survey._id}>
                            <div>
                                <div className={"bg-gray-700 p-4 text-white items-center relative"}>
                                    <div className={"truncate text-xl font-extralight capitalize"}>{survey.dream}</div>
                                    <div className={`truncate text-xs font-extralight`}>
                                        {moment(survey.timestamp).format("MMMM Do YYYY @ h:mm a")}
                                    </div>
                                </div>
                            </div>

                            <div className={"flex flex-wrap"}>
                                <div className={"flex-grow p-3"}>
                                    <div className={"my-2"}>
                                        <p className={"text-xs text-gray-600 dark:text-gray-400"}>Priority domains:</p>
                                        <ul className={"list-disc pl-5"}>
                                            {survey.priority.map((item, i) => {
                                                return <li key={i}>{labelMap[item]}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={"text-xs p-4 flex"}>
                                <div
                                    title={"Map your priorities"}
                                    className={"grow bg-indigo-700 hover:bg-indigo-500 text-center text-white p-2 rounded-full mr-2 cursor-pointer"}
                                    onClick={() => {
                                        if (isClientSurvey) {
                                            router.push({
                                                pathname: "/map-of-my-dreams",
                                                query: {
                                                    dreamId: survey.dreamId,
                                                    dream: survey.dream,
                                                    surveyId: survey._id,
                                                    county: user.county,
                                                    domain: survey.priority,
                                                    clientId: clientId
                                                }
                                            }).then()
                                        } else {
                                            router.push({
                                                pathname: "/map-of-my-dreams",
                                                query: {
                                                    dreamId: survey.dreamId,
                                                    dream: survey.dream,
                                                    surveyId: survey._id,
                                                    county: user.county,
                                                    domain: survey.priority
                                                }
                                            }).then()
                                        }

                                    }}>Map your priorities
                                </div>
                                {
                                    (new Date() - new Date(survey.datestamp)) / (1000 * 60 * 60) < 12 ?
                                        <div
                                            title={"Edit this life area survey"}
                                            className={"flex-auto bg-indigo-400 hover:bg-indigo-200 text-center text-white p-2 rounded-full cursor-pointer"}
                                            onClick={() => {
                                                router.push("/new-life-area-survey?dreamName=" + survey.dream + "&dreamId=" + survey.dreamId + "&surveyId=" + survey._id).then()
                                            }}>
                                            <div>Edit Survey</div>
                                        </div> : null
                                }
                                <div
                                    title={"Review this life area survey"}
                                    className={"flex-auto bg-green-500 hover:bg-green-300 text-center text-white p-2 rounded-full cursor-pointer"}
                                    onClick={() => {
                                        if (isClientSurvey) {
                                            router.push("/client/survey/" + survey._id + "?isYouthSurvey=" + survey.isYouthSurvey).then()
                                        } else {
                                            router.push("/surveys/" + survey._id + "?isYouthSurvey=" + survey.isYouthSurvey).then()
                                        }

                                    }}>
                                    <div>View Survey</div>
                                </div>

                            </div>
                        </div>
                    )
                }

            })}
        </div>
    );
}

export default LasCurrent;
