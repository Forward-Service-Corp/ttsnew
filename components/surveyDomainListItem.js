import {labelMap} from "../lib/serviceLabelsMap";
import {CheckCircle, Circle, Flag} from "phosphor-react";

export default function SurveyDomainListItem({item, setActiveDomain, activeDomain, answered, domains, setOpen}) {
    return (
        <div
            className={`py-2 px-4 bg-gray-200 flex justify-between cursor-pointer w-full hover:bg-gray-600 hover:text-white
            ${activeDomain === item ? "bg-gray-400" : null} 
            ${answered.hasOwnProperty(item) ? "bg-green-400" : null} `}
            key={item} onClick={() => {
            setActiveDomain(item)
            setOpen(false)
        }}>
            <div className={"self-center text-sm mr-3"}>{labelMap[item]}</div>
            <div className={"flex justify-end"}>
                <div>
                    {domains.indexOf(item) > -1 ? <Flag size={20} color={"red"}/> : null}
                </div>
                <div>
                    {answered.hasOwnProperty(item) ? <CheckCircle size={20} weight="thin"/> :
                        <Circle size={20} weight="thin"/>}
                </div>
            </div>
        </div>
    )
}
