import {lasList} from "../lib/lasList";
import {CaretDoubleRight, CaretDoubleLeft} from "phosphor-react";
import SurveyDomainListItem from "./surveyDomainListItem";
import styles from "../styles/SurveyDomainList.module.scss"
import {useState} from "react";

export default function SurveyDomainList({setActiveDomain, activeDomain, answered, domains}) {

    const [open, setOpen] = useState(false)
    const [tapped, setTapped] = useState(false)
    const list = Object.keys(lasList)

    return (
        <div
            className={`${styles.surveyDomainList} ${open ? styles.open : null}  bg-gradient-to-r from-gray-300 to-gray-100 rounded relative`}>

            <div className={`${styles.openButton} bg-gradient-to-r from-indigo-700 to-indigo-500`} onClick={() => {
                setOpen(!open)
                setTapped(true)
            }}>
                {open ? <CaretDoubleLeft size={32} weight="thin" color={"#ffffff"}/> :
                    <CaretDoubleRight size={32} weight="thin" color={"#ffffff"}/>}
                <div
                    className={`absolute rounded-full w-3 h-3 bg-orange-500 top-0 right-[-5px] ${!tapped ? "animate-ping" : "hidden"}`}></div>
            </div>
            <div className={`${styles.listInner} rounded divide-y divide-white divide-opacity-20 overflow-hidden`}>
                <div className={"bg-gradient-to-r from-indigo-800 to-indigo-500 py-3 px-4 text-white font-light"}>
                    <p className={"uppercase"}>Life areas</p>
                    <p className={"text-xs"}>Tap on each of the life areas and answer the corresponding question. There
                        are 21 total areas, so you may need to scroll down if you&apos;re using a mobile device.</p><p className={"text-xs"}> Life
                        areas that you have marked as a priority with the toggle will have a red flag below.</p>
                </div>
                {list.map((item, i) => {
                    return (
                        <SurveyDomainListItem key={i} item={item} setActiveDomain={setActiveDomain}
                                              activeDomain={activeDomain} answered={answered} domains={domains}
                                              setOpen={setOpen}/>
                    )
                })}
            </div>
        </div>
    )
}
