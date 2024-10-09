import {lasList} from "../lib/lasList";
import {lasYouthList} from "../lib/lasYouthList"
import {labelMap} from "../lib/serviceLabelsMap";
import Toggle from "./toggle";

function NewLifeAreaSurveyForm({activeDomain, setAnswered, answered, domains, setDomains, user}) {

    const answerArr = [1,2,3,4,5,0]

    const useSurvey = !user.isYouth || user.isYouth === false  ? lasList : lasYouthList

    return (
        <div className={"ml-4"}>

                <div className={`${true ? ' bg-green-100' : 'bg-blue-100'} flex justify-between items-center bg-opacity-40 p-6 rounded-lg`}>
                    <div className={"w-2/4"}>
                        <div className={'text-2xl mb-2'}>{labelMap[activeDomain]}</div>
                        <div className={"text-xs "}>
                            Select the option that best
                            describes your condition in each of the life areas. You must select an answer for each life area.
                            If one does not apply to you, then select &quot;This does not apply to me.&quot;
                        </div>
                    </div>
                    <div className={`flex items-center w-1/4 justify-end`}>
                        <div className={'h-full bg-indigo-500 text-white text-sm rounded-full py-2 px-4'}>Make Priority</div>
                        {/*<span className={"text-sm text-red-600 mr-4"}>Set as a priority</span>*/}
                        {/*<Toggle domains={domains} setDomains={setDomains} activeDomain={activeDomain}/>*/}
                    </div>
                </div>
            <div className={"mt-8"}>

                <form onChange={async (event) => {
                    await setAnswered(prevState => ({
                        ...prevState,
                        [activeDomain]: {
                            ...prevState[activeDomain],
                            selection: eval(event.target.value),
                            statement: event.target.dataset.statement
                        }
                    }))
                }}>
                    {answerArr.map(index => {
                        return (
                            <div key={index} className={"flex justify-center align-middle"}>
                                <div className={"flex-1 self-center"}>
                                    <input checked={answered[activeDomain] && answered[activeDomain].selection === index} value={index}
                                           className={"hidden peer"} type={"radio"} id={activeDomain + "-" + index}
                                           data-statement={useSurvey[activeDomain].statements[index]}
                                           name={activeDomain}/>
                                    <label
                                        className={"relative hover:bg-gray-100 peer-checked:bg-green-300 mb-4 border text-sm flex items-center justify-between rounded overflow-hidden dark:hover:bg-gray-700 dark:peer-checked:bg-purple-800 dark:text-white dark:bg-black dark:bg-opacity-70 dark:shadow-xl dark:border-none"}
                                        htmlFor={activeDomain + "-" + index}>
                                        <div className={"p-4"}>{useSurvey[activeDomain].statements[index]}</div>
                                        <div className={"flex justify-center items-center bg-orange-600 text-white min-w-[50px] h-full absolute right-0 top-0 dark:bg-indigo-600"}>
                                            <div className={"text-sm"}>{index}</div>
                                        </div>
                                    </label>

                                </div>

                            </div>
                        )
                    })}

                </form>
            </div>
        </div>
    );
}

export default NewLifeAreaSurveyForm;
