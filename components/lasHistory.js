import {useRouter} from "next/router";
import {labelMap} from "../lib/serviceLabelsMap";
import moment from "moment";
import {Link, ListNumbers} from "phosphor-react";
import React from "react";

function LasHistory({surveys, isClientView}) {

    const router = useRouter()

    return (
        <div className={"grid grid-cols-1 lg:grid-cols-2"}>
            {surveys.sort((a, b) => new Date(b.datestamp) - new Date(a.datestamp)).map((survey, i) => {
                if (i > 0) {
                    return (
                        <div
                            className={"shadow mr-5 mb-5 text-sm overflow-hidden relative flex flex-col justify-between dark:bg-black dark:text-white dark:rounded-xl dark:overflow-hidden dark:bg-opacity-70"}
                            key={survey._id}>
                            <div>
                                <div className={"bg-gray-700 p-3 truncate font-light text-white flex justify-start"}>
                                    <div><ListNumbers size={22}/></div>
                                    <div className={"ml-2"}>{survey.dream}</div>
                                </div>
                                <div
                                    className={"bg-gray-100 p-2 text-xs dark:bg-black dark:bg-opacity-80"}>{moment(survey.datestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
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
                            <div className={"flex text-center text-white text-xs justify-end"}>
                                <div
                                    title={"Review this life area survey"}
                                    className={"p-2 flex-1 cursor-pointer bg-green-500 hover:bg-green-600  max-w-[40px] flex justify-center"}
                                    onClick={() => {
                                        if (isClientView) {
                                            router.push("/client/survey/" + survey._id + "?isYouthSurvey=" + survey.isYouthSurvey).then()
                                        } else {
                                            router.push("/surveys/" + survey._id + "?isYouthSurvey=" + survey.isYouthSurvey).then()
                                        }
                                    }}>
                                    <div><Link size={15}/></div>
                                </div>
                            </div>
                        </div>
                    )
                }

            })}
        </div>
    );
}

export default LasHistory;
