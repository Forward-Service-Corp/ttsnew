import {labelMap} from "../lib/serviceLabelsMap";
import {CheckCircle, Circle, Flag} from "phosphor-react";

export default function SurveyDomainListItem({item, activeDomain, setActiveDomain, answered, domains, setOpen}) {
    return (
        <div
            className={`${activeDomain === item ? "bg-indigo-100 " : "bg-gray-50"} px-4 mb-2 flex py-3 justify-between cursor-pointer w-full whitespace-nowrap rounded`}
            key={item} onClick={() => {
            setActiveDomain(item)
            setOpen(false)
        }}>
            <div className={"self-center text-xs mr-3 "}>{labelMap[item]}</div>
            <div className={"flex justify-end"}>
                <div className={"mr-1"}>
                    {domains.indexOf(item) > -1 ? <Flag size={20} color={"red"}/> : null}
                </div>
                <div>
                    {answered.hasOwnProperty(item) ? <CheckCircle size={20} color={"green"}/> :
                        <Circle size={20} weight="thin" color={"#7a7878"}/>}
                </div>
            </div>
        </div>
    )
}
