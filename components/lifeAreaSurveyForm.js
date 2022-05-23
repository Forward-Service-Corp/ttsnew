import {useState} from "react";
import {lasList} from "../lib/lasList"
import {useRouter} from "next/router";

export default function LifeAreaSurveyForm({user, currentDream, currentDreamId}) {

    const router = useRouter()

    async function updateDreamStatus () {
        alert(currentDreamId)
        await fetch("/api/update-dream-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: currentDreamId,
                surveyComplete: true,
            })
        })
    }

    async function saveSurvey() {
        await fetch("/api/post-life-area-survey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: currentDreamId,
                dream: currentDream,
                totalScore: food[0] + money[0] + substances[0] + mentalHealth[0] + safety[0] +
                    healthInsurance[0] + transportation[0] + disabilities[0] + lifeSkills[0] + work[0] + legal[0] +
                    childcare[0] + adultEducation[0] + parentingSkills[0] + childrensEducation[0] +
                    communityInvolvement[0] + budgeting[0] + familyFriendsSupport[0] + racismBigotry[0] +
                    internetAccess[0] + housing[0],
                priority: priority,
                food: food,
                money: money,
                substances: substances,
                mentalHealth: mentalHealth,
                safety: safety,
                healthInsurance: healthInsurance,
                transportation: transportation,
                disabilities: disabilities,
                lifeSkills: lifeSkills,
                work: work,
                legal: legal,
                childcare: childcare,
                adultEducation: adultEducation,
                parentingSkills: parentingSkills,
                childrensEducation: childrensEducation,
                communityInvolvement: communityInvolvement,
                familyFriendsSupport: familyFriendsSupport,
                budgeting: budgeting,
                racismBigotry: racismBigotry,
                internetAccess: internetAccess,
                housing: housing,
                userId: user._id
            })
        })
    }

    const [data, setData] = useState(lasList)
    const [priority, setPriority] = useState([])
    const [food, setFood] = useState([0, ""])
    const [money, setMoney] = useState([0, ""])
    const [substances, setSubstances] = useState([0, ""])
    const [mentalHealth, setMentalHealth] = useState([0, ""])
    const [safety, setSafety] = useState([0, ""])
    const [healthInsurance, setHealthInsurance] = useState([0, ""])
    const [transportation, setTransportation] = useState([0, ""])
    const [disabilities, setDisabilities] = useState([0, ""])
    const [lifeSkills, setLifSkills] = useState([0, ""])
    const [work, setWork] = useState([0, ""])
    const [legal, setLegal] = useState([0, ""])
    const [childcare, setChildcare] = useState([0, ""])
    const [adultEducation, setAdultEducation] = useState([0, ""])
    const [parentingSkills, setParentingSkills] = useState([0, ""])
    const [childrensEducation, setChildrensEducation] = useState([0, ""])
    const [communityInvolvement, setCommunityInvolvement] = useState([0, ""])
    const [familyFriendsSupport, setFamilyFriendsSupport] = useState([0, ""])
    const [budgeting, setBudgeting] = useState([0, ""])
    const [racismBigotry, setRacismBigotry] = useState([0, ""])
    const [internetAccess, setInternetAccess] = useState([0, ""])
    const [housing, setHousing] = useState([0, ""])


    const checkPriority = (value) => {
        if (priority.indexOf(value) === -1) {
            setPriority(prevState => [...prevState, value])
        } else {
            setPriority(prevState => prevState.filter(item => item !== value))
        }
    }

    const keys = Object.keys(data)
    return (
        <div className={""}>
            <div>
                <div className={"uppercase text-gray-500 mb-4"}>Priority Areas</div>
                <div>
                    {priority.map((priority, i) => {
                        return <div
                            onClick={() => {
                                setPriority(prevState => prevState.filter(item => item !== priority))
                                document.getElementById(priority).checked = false
                            }}
                            className={"inline border-2 border-cyan-500 px-3 py-1 text-xs rounded mr-2 cursor-pointer"}
                            key={i}><span className={"capitalize"}>{priority}</span><span className={"ml-2"}>X</span>
                        </div>
                    })}
                </div>
                <div
                    className={"mt-5"}>Score: {food[0] + money[0] + substances[0] + mentalHealth[0] + safety[0] +
                    healthInsurance[0] + transportation[0] + disabilities[0] + lifeSkills[0] + work[0] + legal[0] +
                    childcare[0] + adultEducation[0] + parentingSkills[0] + childrensEducation[0] +
                    communityInvolvement[0] + budgeting[0] + familyFriendsSupport[0] + racismBigotry[0] +
                    internetAccess[0] + housing[0]}</div>
            </div>
            {keys.map((key) => {
                return (
                    <div key={key}>
                        <div
                            className={`flex justify-between align-middle p-3 mt-5 mb-2  text-lg font-bold bg-gray-200 ${eval(key)[1] !== "" ? "bg-green-300" : ""}`}>
                            <div className={"self-center w-1/3"}>
                                {lasList[key].label}
                            </div>
                            <div className={"self-center w-1/3 text-center"}>
                                <span className={"text-xs"}>Score: {eval(key)[0]}</span>
                            </div>
                            <div className={"self-center w-1/3 text-right"}>
                                <span className={"text-xs"}> Make priority </span>
                                <input onChange={(e) => {
                                    checkPriority(e.target.value)
                                }} type={"checkbox"} id={key} value={key}/>
                            </div>
                        </div>
                        <form onChange={(event) => {

                            switch (key) {
                                case "food":
                                    setFood([parseInt(event.target.value), event.target.dataset.statement])

                                    break;
                                case "money":
                                    setMoney([parseInt(event.target.value), event.target.dataset.statement])

                                    break;
                                case "substances":
                                    setSubstances([parseInt(event.target.value), event.target.dataset.statement])

                                    break;
                                case "mentalHealth":
                                    setMentalHealth([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "safety":
                                    setSafety([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "healthInsurance":
                                    setHealthInsurance([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "transportation":
                                    setTransportation([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "disabilities":
                                    setDisabilities([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "lifeSkills":
                                    setLifSkills([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "work":
                                    setWork([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "legal":
                                    setLegal([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "childcare":
                                    setChildcare([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "adultEducation":
                                    setAdultEducation([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "parentingSkills":
                                    setParentingSkills([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "childrensEducation":
                                    setChildrensEducation([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "communityInvolvement":
                                    setCommunityInvolvement([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "budgeting":
                                    setBudgeting([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "familyFriendsSupport":
                                    setFamilyFriendsSupport([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "racismBigotry":
                                    setRacismBigotry([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "internetAccess":
                                    setInternetAccess([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                case "housing":
                                    setHousing([parseInt(event.target.value), event.target.dataset.statement])
                                    break;
                                default:
                                    break;
                            }
                        }}>
                            <div className={"flex columns-6"}>
                                {data[key].statements.map((statement, i) => {
                                    return (
                                        <div key={key + i} className={"w-1/6 p-1 m-1 border rounded"}>
                                            <input className={"hidden peer"} type={"radio"} name={key} id={key + i}
                                                   value={i} data-statement={statement}/>
                                            <label
                                                className={"text-xs block p-2 peer-checked:bg-gray-300 h-full rounded"}
                                                htmlFor={key + i}>{statement}</label>
                                        </div>
                                    )
                                })}
                            </div>
                        </form>
                    </div>
                )
            })}

            <div className={"mt-20 flex justify-between"}>
                <div className={""}>
                    <button onClick={() => {
                        if (food[1] && money[1] && substances[1] && mentalHealth[1] && safety[1] && healthInsurance[1] && transportation[1] && disabilities[1] &&
                            lifeSkills[1] && work[1] && legal[1] && childcare[1] && adultEducation[1] && parentingSkills[1] && childrensEducation[1] && communityInvolvement[1] &&
                            budgeting[1] && familyFriendsSupport[1] && racismBigotry[1] && internetAccess[1] && housing[1]) {

                            if (priority.length > 0) {
                                saveSurvey()
                                    .then(res => console.log(res))
                                    .catch(err => console.warn(err))
                                updateDreamStatus()
                                    .then(res => console.log(res))
                                    .catch(err => console.warn(err))
                                router.reload()

                            } else {
                                alert("Please choose at least 1 priority area.")
                            }

                        } else {
                            alert("missing some data")
                        }
                    }}
                            className={"px-8 py-3 rounded border bg-indigo-600 text-white"}>Submit
                    </button>

                </div>
            </div>
        </div>
    )
}
