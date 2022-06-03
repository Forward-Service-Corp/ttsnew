import {lasList} from "../lib/lasList";
import {labelMap} from "../lib/serviceLabelsMap";
import {CaretDoubleRight, CaretDoubleLeft} from "phosphor-react";
import SurveyDomainListItem from "./surveyDomainListItem";
import styles from "../styles/SurveyDomainList.module.scss"
import {useState} from "react";

export default function SurveyDomainList({setActiveDomain, activeDomain, answered, domains}) {

    const [open, setOpen] = useState(false)
    const list = Object.keys(lasList)

    return (
        <div className={`${styles.surveyDomainList} ${open ? styles.open : null}  bg-gray-200 rounded`}>
            <div className={styles.openButton} onClick={() => {
                setOpen(!open)
            }}>
                {open ? <CaretDoubleLeft size={32} weight="thin" color={"#ffffff"}/> : <CaretDoubleRight size={32} weight="thin" color={"#ffffff"}/>}

            </div>
            <div className={`${styles.listInner} rounded divide-y overflow-hidden`}>
                {list.map((item, i) => {
                    return (
                        <SurveyDomainListItem key={i} item={item} setActiveDomain={setActiveDomain}
                                              activeDomain={activeDomain} answered={answered} domains={domains} setOpen={setOpen}/>
                    )
                })}
            </div>
        </div>
    )
}
