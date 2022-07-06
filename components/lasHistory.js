import {useRouter} from "next/router";
import {labelMap} from "../lib/serviceLabelsMap";
import moment from "moment";
import {ListNumbers} from "phosphor-react";

function LasHistory({surveys, isClientView}) {

    const router = useRouter()

    return (
        <div className={"grid grid-cols-1 lg:grid-cols-2"}>
            {surveys.sort((a, b) => new Date(b.datestamp) - new Date(a.datestamp)).map((survey, i) => {
                if (i > 0) {
                    return (
                        <div
                            className={"rounded shadow mr-5 mb-5 text-sm overflow-hidden relative flex flex-col justify-between"}
                            key={survey.dream}>
                            <div>
                                <div className={"bg-gray-700 p-3 truncate font-light text-white flex justify-start"}>
                                    <div><ListNumbers size={22}/></div>
                                    <div className={"ml-2"}>{survey.dream}</div>
                                </div>
                                <div
                                    className={"bg-gray-100 p-2 text-xs"}>{moment(survey.datestamp).format("dddd, MMMM Do YYYY, h:mm:ss a")}</div>
                            </div>
                            <div className={"flex flex-wrap"}>
                                <div className={"flex-grow p-3"}>
                                    <div className={"my-2"}>
                                        <p className={"text-xs text-gray-600"}>Priority domains:</p>
                                        <ul className={"list-disc pl-5"}>
                                            {survey.priority.map((item, i) => {
                                                return <li key={i}>{labelMap[item]}</li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={"flex text-center text-white text-xs"}>
                                {/*<div className={"bg-indigo-600 p-3 flex-1 cursor-pointer hover:bg-indigo-500"}
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
                                     }}>Map this survey
                                </div>*/}
                                <div className={"p-3 flex-1 cursor-pointer bg-gradient-to-t from-green-600 to-green-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}
                                     onClick={() => {
                                         if(isClientView){
                                             router.push("/client/survey/" + survey._id).then()
                                         }else{
                                             router.push("/surveys/" + survey._id).then()
                                         }

                                     }}>Review
                                </div>
                                {/*<div className={"bg-red-600 p-3 flex-1 cursor-pointer hover:bg-red-500"} onClick={() => {
                                    if (confirm("Are you sure you want to delete this survey? This action is permanent.")) {
                                        deleteSurvey(survey._id)
                                            .then(() => {
                                                getSurveys()
                                                    .catch(err => console.warn(err))
                                            })
                                            .catch(err => console.warn(err))
                                    }
                                }}>Delete
                                </div>*/}
                            </div>
                        </div>
                    )
                }

            })}
        </div>
    );
}

export default LasHistory;
