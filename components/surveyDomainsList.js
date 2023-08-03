import {lasList} from "../lib/lasList";
import {lasYouthList} from "../lib/lasYouthList"
import {CaretDoubleRight, CaretDoubleLeft} from "phosphor-react";
import SurveyDomainListItem from "./surveyDomainListItem";
import styles from "../styles/SurveyDomainList.module.scss"
import {useState} from "react";

export default function SurveyDomainList({setActiveDomain, activeDomain, answered, domains, user}) {

    const useSurvey = !user.isYouth || user.isYouth === false  ? lasList : lasYouthList

    const [open, setOpen] = useState(false)
    const [tapped, setTapped] = useState(false)
    const list = Object.keys(useSurvey)

    return (
        <div
            className={`${styles.surveyDomainList} ${open ? styles.open : null}   relative bg-gray-100`}>

            <div className={`${styles.openButton} bg-gradient-to-r from-green-700 to-green-500`} onClick={() => {
                setOpen(!open)
                setTapped(true)
            }}>
                {open ? <CaretDoubleLeft size={32} weight="thin" color={"#ffffff"}/> :
                    <CaretDoubleRight size={32} weight="thin" color={"#ffffff"}/>}
                <div
                    className={`absolute rounded-full w-3 h-3 bg-orange-500 top-0 right-[-5px] ${!tapped ? "animate-ping" : "hidden"}`}></div>
            </div>
            <div className={`${styles.listInner}  divide-y divide-white divide-opacity-20 overflow-hidden`}>
                <div className={"bg-gradient-to-r from-orange-600 to-orange-400 py-3 px-4 text-white font-light"}>
                    <p className={"uppercase"}>Life areas</p>

                </div>
                <div className={"divide-y"}>{list.map((item, i) => {
                    return (
                        <SurveyDomainListItem key={i} item={item} setActiveDomain={setActiveDomain}
                                              activeDomain={activeDomain} answered={answered} domains={domains}
                                              setOpen={setOpen}/>
                    )
                })}</div>
            </div>
        </div>
    )
}
