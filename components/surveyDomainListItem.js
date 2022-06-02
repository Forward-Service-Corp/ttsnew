import {labelMap} from "../lib/serviceLabelsMap";
import {CheckCircle, Circle} from "phosphor-react";

export default function SurveyDomainListItem ({item, setActiveDomain, activeDomain, answered}) {
    return (
        <div className={`py-2 px-4 bg-gray-200 flex justify-between cursor-pointer ${activeDomain === item ? "bg-gray-400" : null} ${answered.hasOwnProperty(item) ? "bg-green-400" : null}`} key={item} onClick={() => {
            setActiveDomain(item)
        }}>
            <div className={"self-center text-sm"}>{labelMap[item]}</div>
            <div>
                {answered.hasOwnProperty(item) ? <CheckCircle size={32} weight="thin"/> :  <Circle size={32} weight="thin"/>}
            </div>
        </div>
    )
}
