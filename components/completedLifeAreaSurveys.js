import {useRouter} from "next/router";

function CompletedLifeAreaSurveys({dreams, user}) {
    const router = useRouter()
    return (
        <div className={"flex columns-3"}>
            {dreams.filter(item => item.surveyComplete === true).map(dream => {
                return (
                    <div className={"rounded p-4 shadow w-1/2 mr-5 mb-5 text-sm"} key={dream.survey.dream}>
                        <div className={"flex"}>
                            <div className={"w-2/3"}>

                                <p className={"text-xs text-gray-600"}>Dream:</p>
                                <p>{dream.survey.dream}</p>

                                <p className={"text-xs text-gray-600 mt-3"}>What do you need:</p>
                                <p>{dream.dreamNeed}</p>

                                <p className={"text-xs text-gray-600 mt-3"}>Dream:</p>
                                <p>{dream.dreamHelp}</p>

                                <div className={"my-2"}>
                                    <p className={"text-xs text-gray-600"}>Priority domains:</p>
                                    <ul className={"list-disc pl-5"}>
                                        {dream.survey.priority.map((item, i) => {
                                            return <li key={i}>{item}</li>
                                        })}
                                    </ul>
                                </div>
                                <div>
                                    <span className={"text-gray-500 text-xs"}>Total Score:</span> {dream.survey.totalScore}
                                </div>
                                <div>
                                    <span className={"text-gray-500 text-xs"}>Completed on:</span>
                                    <p>{dream.survey.datestamp}</p>
                                </div>
                            </div>
                            <div className={"text-right w-1/3 border-l-2 border-l-gray-100"}>
                                <div>
                                    <button className={"text-sm text-white bg-indigo-600 rounded px-4 py-2 cursor-pointer mb-3"} onClick={() => {
                                        router.push({
                                            pathname: "/map-of-my-dreams",
                                            query: {
                                                surveyId: dream.survey._id,
                                                county: user.county,
                                                domain: dream.survey.priority
                                            }
                                        })
                                    }}>Map this Dream
                                    </button>
                                    <button className={"text-sm text-white bg-red-600 rounded px-4 py-2 cursor-pointer"} onClick={() => {
                                        if (confirm("Are you sure you want to delete this survey? This action is permanent.")) {
                                            deleteSurvey(survey._id)
                                                .then(res => console.log(res))
                                                .catch(err => console.warn(err))
                                        }
                                    }}>Delete dream
                                    </button>
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
