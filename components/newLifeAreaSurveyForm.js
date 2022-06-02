import {lasList} from "../lib/lasList";
import {labelMap} from "../lib/serviceLabelsMap";
import {useState} from "react";
import Toggle from "./toggle";

function NewLifeAreaSurveyForm({activeDomain, setAnswered, answered}) {

    const [selectedValue, setSelectedValue] = useState("")

    return (
        <div className={"p-4"}>
            <div className={"flex justify-between"}>
                <div>
                    <h2 className={"uppercase text-indigo-600 text-xl"}>{labelMap[activeDomain]}</h2>
                </div>
                <div>
                    <span className={"text-sm text-indigo-600 mr-4"}>Set as a priority life area</span><Toggle/>
                </div>
            </div>

            <p className={"text-sm"}>Select the option that best describes your condition in each of the life areas. You
                must select an answer
                for each life area. If one does not apply to you, then select &quot;This does not apply to me.&quot;</p>
            <div className={"p-8"}>

                <form onChange={(event) => {
                    setSelectedValue(event.target.value)
                    setAnswered(prevState => ({
                        ...prevState,
                        [activeDomain]: {
                            ...prevState[activeDomain],
                            selection: event.target.value
                        }
                    }))
                }}>
                    <div>
                        <input checked={answered[activeDomain] && answered[activeDomain].selection === "NA"}
                               value={"NA"} className={"hidden peer"} type={"radio"} id={activeDomain + "-0"}
                               name={activeDomain}/>
                        <label className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300 rounded mb-2"}
                               htmlFor={activeDomain + "-0"}>This does not apply to me.</label>
                    </div>

                    <div>
                        <input checked={answered[activeDomain] && answered[activeDomain].selection === "1"} value={"1"}
                               className={"hidden peer"} type={"radio"} id={activeDomain + "-1"}
                               name={activeDomain}/>
                        <label className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300 rounded mb-2"}
                               htmlFor={activeDomain + "-1"}>{lasList[activeDomain].statements[1]}</label>
                    </div>

                    <div>
                        <input checked={answered[activeDomain] && answered[activeDomain].selection === "2"} value={"2"}
                               className={"hidden peer"} type={"radio"} id={activeDomain + "-2"}
                               name={activeDomain}/>
                        <label className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300 rounded mb-2"}
                               htmlFor={activeDomain + "-2"}>{lasList[activeDomain].statements[2]}</label>
                    </div>

                    <div>
                        <input checked={answered[activeDomain] && answered[activeDomain].selection === "3"} value={"3"}
                               className={"hidden peer"} type={"radio"} id={activeDomain + "-3"}
                               name={activeDomain}/>
                        <label className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300 rounded mb-2"}
                               htmlFor={activeDomain + "-3"}>{lasList[activeDomain].statements[3]}</label>
                    </div>

                    <div>
                        <input checked={answered[activeDomain] && answered[activeDomain].selection === "4"} value={"4"}
                               className={"hidden peer"} type={"radio"} id={activeDomain + "-4"}
                               name={activeDomain}/>
                        <label className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300 rounded mb-2"}
                               htmlFor={activeDomain + "-4"}>{lasList[activeDomain].statements[4]}</label>
                    </div>

                    <div>
                        <input checked={answered[activeDomain] && answered[activeDomain].selection === "5"} value={"5"}
                               className={"hidden peer"} type={"radio"} id={activeDomain + "-5"}
                               name={activeDomain}/>
                        <label className={"block p-2 hover:bg-gray-300 peer-checked:bg-green-300 rounded mb-2"}
                               htmlFor={activeDomain + "-5"}>{lasList[activeDomain].statements[5]}</label>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewLifeAreaSurveyForm;
