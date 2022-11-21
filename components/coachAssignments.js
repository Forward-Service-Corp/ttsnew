import React, {useState} from 'react';
import {useRouter} from "next/router";

function CoachAssignments({coachesJson, viewingUser}) {

    const router = useRouter()
    const [dataChanged, setDataChanged] = useState(false)
    const [newCoaches, setNewCoaches] = useState(viewingUser.coach || [])
    const [savingUpdates, setSavingUpdates]  = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    async function saveCoaches() {
        await fetch("/api/save-coaches", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: viewingUser._id,
                coaches: newCoaches
            })
        })
            .then(res => {
                console.log(res)
                setSavingUpdates(true)
            })
            .catch(err => console.warn(err))
        router.reload()
    }

    return (
        <div className={"bg-gray-100 p-6 mb-5 rounded"}>
            <div className={"flex justify-between items-center p-3"}>
                <div>
                    <h2 className={"uppercase text-gray-500"}>Coach Assignments</h2>
                </div>
                <div className={`flex items-center`}>
                    <input type="text" className={`border-gray-300 text-xs`} value={searchTerm} placeholder={"Filter coaches..."} onChange={e => setSearchTerm(e.target.value)}/>
                    <button className={`px-6 py-2 ml-3 text-xs bg-pink-600 text-white`} onClick={() => {setSearchTerm("")}}>Clear</button>
                </div>
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2"}>
                {coachesJson && coachesJson.filter(coach => coach.email.includes(searchTerm)).sort((a, b) => b.name - a.name).map(coach => {
                    return (
                        <div key={coach.email} className={"p-1"}>
                            <input className={"peer hidden"}
                                   defaultChecked={newCoaches?.indexOf(coach.email) > -1}
                                   onChange={(e) => {
                                       if (newCoaches?.indexOf(e.target.value) === -1) {
                                           setNewCoaches(prevState => [...prevState, e.target.value])
                                       } else {
                                           setNewCoaches(prevState => prevState.filter(coach => coach !== e.target.value))
                                       }
                                       setDataChanged(true)
                                   }}
                                   value={coach.email}
                                   type={"checkbox"}
                                   id={coach.email}
                                   name={coach.name}/>
                            <label className={"p-2 bg-white text-xs block text-center border-[1px] rounded text-black truncate peer-checked:bg-orange-600 peer-checked:text-white"}
                                   htmlFor={coach.email}>
                                <div>{coach.name || "undefined"}</div>
                                <div>{coach.email || "undefined"}</div>
                            </label>
                        </div>
                    )
                })}
            </div>
            <div>
                <div className={"flex items-center justify-start mt-4 pt-4 border-t-[1px] border-gray-400"}>
                    <button disabled={!dataChanged}
                            onClick={saveCoaches}
                            className={"py-2 px-6 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>Save
                        coach updates
                    </button>
                    <div className={`text-xs p-4 text-green-600 ${savingUpdates ? "visible" : "hidden"}`}>Saving coach updates...</div>
                </div>
            </div>
        </div>
    );
}

export default CoachAssignments;
