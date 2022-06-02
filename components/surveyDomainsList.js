import {lasList} from "../lib/lasList";
import {labelMap} from "../lib/serviceLabelsMap";
import {CaretDoubleRight} from "phosphor-react";
import SurveyDomainListItem from "./surveyDomainListItem";
import styles from "../styles/SurveyDomainList.module.scss"
import {useState} from "react";

export default function SurveyDomainList({setActiveDomain, activeDomain, answered}) {

    const [open, setOpen] = useState(false)
    const list = Object.keys(lasList)

    return (
        <div className={`${styles.surveyDomainList} ${open ? styles.open : null}`}>
            <div className={styles.openButton} onClick={() => {
                setOpen(!open)
            }}>
                <CaretDoubleRight size={32} weight="thin" color={"#ffffff"}/>
            </div>
            <div className={styles.listInner}>
                {list.map((item, i) => {
                    return (
                        <SurveyDomainListItem key={i} item={item} setActiveDomain={setActiveDomain}
                                              activeDomain={activeDomain} answered={answered}/>
                    )
                })}
            </div>
        </div>
    )
}
