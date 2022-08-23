import {lasList} from "../lib/lasList";
import {labelMap} from "../lib/serviceLabelsMap";
import Toggle from "./toggle";

function NewLifeAreaSurveyForm({activeDomain, setAnswered, answered, domains, setDomains}) {

    const answerArr = [0,1,2,3,4,5]

    return (
        <div className={"p-0 md:p-4"}>
            <div className={"md:flex justify-between"}>
                <div className={""}>
                    <h2 className={"uppercase text-orange-600 text-xl font-serif"}>{labelMap[activeDomain]}</h2>
                </div>
                <div>
                    <span className={"text-sm text-red-600 mr-4"}>Set as a priority</span>
                    <Toggle domains={domains} setDomains={setDomains} activeDomain={activeDomain}/>
                </div>
            </div>

            <p className={"text-sm mt-7"}>Select the option that best describes your condition in each of the life
                areas. You must select an answer for each life area. If one does not apply to you, then
                select &quot;This does not apply to me.&quot;</p>
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
                                           data-statement={lasList[activeDomain].statements[index]}
                                           name={activeDomain}/>
                                    <label
                                        className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300 mb-2 border text-sm"}
                                        htmlFor={activeDomain + "-" + index}>{lasList[activeDomain].statements[index]}</label>
                                </div>
                                <div className={"flex justify-center items-center mb-2 bg-orange-600 text-white w-[50px]"}>
                                    <div className={"text-2xl"}>{index}</div>
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
