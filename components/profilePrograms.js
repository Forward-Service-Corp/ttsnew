import {useRouter} from "next/router";
import {useState} from "react";
import {XCircle} from "phosphor-react";

function ProfilePrograms({user}) {
    const router = useRouter()

    const [programs, setPrograms] = useState(user.programs ? user.programs : [])
    const [programsUpdated, setProgramsUpdated] = useState(false)

    async function savePrograms () {
        await fetch("/api/save-programs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                programs,
                userId: user._id
            })
        })
        router.reload()
    }
    return (
        <>
            <div className={"flex flex-col"}>
                <div className={""}>
                    <h2 className={"uppercase text-gray-600 font-light mb-3 dark:text-white"}>Available Programs</h2>
                    <select className={"h-[260px] w-full dark:bg-black dark:text-white dark:border-0"} multiple onChange={(e) => {
                        setPrograms(prevState => {
                            if (programs.indexOf(e.target.value) === -1) {
                                return [...prevState, e.target.value]
                            } else {
                                return prevState
                            }
                        })
                        setProgramsUpdated(true)
                    }}>
                        <option value={`College Bound Math Science (CBMS)`}>College Bound Math Science (CBMS)</option>
                        {/*<option value={`Emergency Assistance`}>Emergency Assistance</option>*/}
                        <option value={`Family Stabilization Program`}>Family Stabilization Program</option>
                        <option value={`FoodShare Employment and Training`}>FoodShare Employment and Training</option>
                        {/*<option value={`Job Access Loans (JAL)`}>Job Access Loans (JAL)</option>*/}
                        <option value={`Jobs for America&apos;s Graduates (JAG)`}>Jobs for America&apos;s Graduates (JAG)</option>
                        <option value={`Refugee Support Services`}>Refugee Services</option>
                        <option value={`Highway Construction Skill Training (HCST)`}>Transportation Alliance for New Solutions (TrANS)</option>
                        <option value={`Upward Bound (UB)`}>Upward Bound (UB)</option>
                        <option value={`Upward Bound Math Science (UBMS)`}>Upward Bound Math Science (UBMS)</option>
                        <option value={`WIOA Adult`}>WIOA Adult and Dislocated Worker</option>
                        <option value={`WIOA Dislocated Worker`}>WIOA Adult and Dislocated Worker</option>
                        <option value={`WIOA Youth`}>WIOA Youth</option>
                        <option value={`Wisconsin Employment Transportation Assistance Program (WETAP)`}>Wisconsin Employment Transportation Assistance Program (WETAP)</option>
                        <option value={`Wisconsin Works (W-2)`}>Wisconsin Works (W-2)</option>
                    </select>
                </div>
                <div className={""}>
                    <h2 className={"uppercase text-gray-600 font-light mb-3 mt-6 dark:text-white"}>Your Selected Programs</h2>
                    <div>
                        {programs.map(program => (
                            <div className={"cursor-pointer rounded border dark:border-[1px] dark:border-gray-800 py-1 px-2 min-h-8 mr-2 mb-2 flex justify-between align-middle text-sm dark:bg-[#111111] dark:text-white w-auto"} key={program}
                                 onClick={() => {
                                     setPrograms(prevState => prevState.filter(item => item !== program))
                                     setProgramsUpdated(true)
                                 }}>
                                <div className={"inline-block"}>{program}</div>
                                <div className={"inline-block"}><XCircle size={20} weight="thin" color={"orange"}/></div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            <div className={"w-full"}>
                <button className={"p-2 bg-indigo-600 text-white rounded mt-4 disabled:bg-gray-500 cursor-pointer text-sm"} onClick={() => {
                    if(programsUpdated){
                        savePrograms()
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                    }

                }} disabled={!programsUpdated}>Update programs
                </button>
            </div>
        </>
    );
}

export default ProfilePrograms;
