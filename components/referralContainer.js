import React, {useEffect, useState} from 'react';
import CarePlanDomain from "./carePlanDomain";
import {CaretDoubleDown, CaretDoubleUp, Trash, CheckCircle, Files} from "phosphor-react";
import TaskTodo from "./taskTodo";
import NoteItem from "./noteItem";
import {labelMap} from "../lib/serviceLabelsMap";
import {useRouter} from "next/router";


function ReferralContainer({item, user, notes, setUserReferrals, modifier, loggedInUser}) {

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [task, setTask] = useState("")
    const [allTasks, setAllTasks] = useState([])
    const [allNotes, setAllNotes] = useState(notes)
    const [saving, setSaving] = useState(true)

    async function saveTask() {
        setSaving(true)
        await fetch("/api/save-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                referralId: item._id,
                userId: user.email,
                task: task,
                surveyId: item.surveyId,
                timestamp: new Date(),
                modifiedBy: modifier
            })
        })
    }

    // async function setTaskStatus(taskId, setTo) {
    //     await fetch("/api/update-task-status?taskId=" + taskId + "&setTo=" + setTo)
    // }

    async function getTasks() {
        const fetchedTasks = await fetch("/api/get-tasks?userId=" + user.email + "&referralId=" + item._id)
            .then(res => res.json())
        await setAllTasks(fetchedTasks)
        await setSaving(false)
    }

    async function deleteReferral(referralId) {
        await fetch("/api/delete-referral?referralId=" + referralId)
    }

    async function deleteCustomReferral(id) {
        await fetch("/api/delete-custom-referral?referralId=" + id)
    }

    async function setReferralStatus(referralId, status) {
        await fetch("/api/set-referral-status?referralId=" + referralId + "&status=" + status)
    }

    async function setCustomReferralStatus(referralId, status) {
        await fetch("/api/set-custom-referral-status?referralId=" + referralId + "&status=" + status)
    }

    async function getReferrals() {
        const fetchedReferrals = await fetch("/api/get-referrals?userId=" + user.email)
            .then(res => res.json())
        await setUserReferrals(fetchedReferrals)
    }

    useEffect(() => {
        getTasks().then()
    }, [])

    return (
        <div className={"my-3"} key={item._id}>
            <div
                className={`flex justify-start items-center text-sm font-light text-white relative p-3 ${item.archived !== "true" ? "bg-orange-500" : "bg-gray-400"}`}>
                <div className={"w-[160px] ml-4 whitespace-nowrap mr-3 truncate"}>{labelMap[item.domain]}</div>
                <div className={"truncate max-w-[200px]"}>{item.name}</div>
                <div
                    className={"absolute right-0 min-w-[100px] flex items-center justify-between h-full pl-3  bg-gray-700"}>
                    <div>Tasks: {allTasks.filter(task => task.referralId === item._id && eval(task.completed) === false).length}</div>
                    <div className={"p-3 cursor-pointer text-xs"} onClick={() => {
                        setOpen(!open)
                    }}>{open ? <CaretDoubleUp size={20} weight="thin"/> :
                        <CaretDoubleDown size={20} weight="thin"/>}</div>
                </div>
            </div>
            <div className={`flex justify-between items-center bg-gray-100 p-2 ${open ? "visible" : "hidden"}`}>
                <div className={"flex items-center text-xs cursor-pointer"} onClick={() => {
                    router.push("/surveys/" + item.surveyId).then()
                }}>
                    <Files size={20} weight="thin" color={"blue"}/>
                    <span className={"text-blue-600"}>View associated Life Area Survey</span>

                </div>
                {item.hasOwnProperty("archived") && item.archived === "true" ?
                    <div className={"flex items-center cursor-pointer"} onClick={() => {
                        if (item.isCustom) {
                            setCustomReferralStatus(item._id, false).then(getReferrals)
                        } else {
                            setReferralStatus(item._id, false).then(getReferrals)
                        }
                    }}>
                        <div><CheckCircle size={20} weight={"thin"} color={"blue"}/></div>
                        <div className={"text-blue-600 text-xs cursor-pointer"}>Make active again</div>
                    </div>
                    :
                    <div className={"flex items-center cursor-pointer"} onClick={() => {
                        if (item.isCustom) {
                            setCustomReferralStatus(item._id, true).then(getReferrals)
                        } else {
                            setReferralStatus(item._id, true).then(getReferrals)
                        }

                    }}>
                        <div><CheckCircle size={20} weight={"thin"} color={"blue"}/></div>
                        <div className={"text-blue-600 text-xs cursor-pointer"}>Mark referral complete</div>
                    </div>
                }


                {item.hasOwnProperty("archived") && item.archived === "true" ?
                    <div className={"flex items-center cursor-pointer ml-5"} onClick={() => {
                        if (confirm("You are about to delete this referral and all of its details. This cannot be undone.")) {
                            if (item.isCustom) {
                                deleteCustomReferral(item._id).then(getReferrals)
                            } else {
                                deleteReferral(item._id).then(getReferrals)
                            }

                        }
                    }}>
                        <div><Trash size={20} weight={"thin"} color={"red"}/></div>
                        <div className={"text-red-600 text-xs cursor-pointer"}>Delete this referral</div>
                    </div>
                    : null}


            </div>
            <div className={`flex ${open ? "visible" : "hidden"} flex-col md:flex-row`}>
                <CarePlanDomain item={item}/>
                <div className={"w-full p-5 inline"}>
                    <h2 className={"uppercase text-orange-600 mb-2"}>Add a new task</h2>
                    <input type={"text"} className={"w-full border-0 border-b-[1px] p-1 text-sm font-light"}
                           value={task} placeholder={"Enter new todo item..."} onChange={(e) => {
                        setTask(e.target.value)
                    }}/>
                    <div className={"flex justify-end"}>
                        <button
                            className={"mt-2 mb-4 text-white px-4 py-2 text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400"}
                            onClick={() => {
                                saveTask().then(() => {
                                    getTasks().then()
                                })
                                setTask("")
                            }} disabled={task === ""}>Save task
                        </button>
                    </div>
                    <div className={`${saving ? "visible" : "hidden"} p-2 rounded bg-green-100 text-xs mb-4`}>Saving...</div>
                    <div className={"uppercase text-orange-600 text-sm mb-1"}>Tasks</div>
                    {allTasks && allTasks.filter(item => eval(item.completed) === false).map((task, i) => {
                        return (
                            <div className={"border-l-[1px]"} key={i}>

                                <TaskTodo item={item} task={task} user={user} setAllTasks={setAllTasks}
                                          setSaving={setSaving}
                                          allNotes={allNotes}
                                          loggedInUser={loggedInUser}
                                          setAllNotes={setAllNotes}/>

                            </div>
                        )
                    })}

                    {allTasks && allTasks.filter(item => eval(item.completed) === true).length > 0 ?
                        <div className={"uppercase text-orange-600 text-sm mt-4"}>Completed</div> : null}

                    {allTasks && allTasks.filter(item => eval(item.completed) === true).map((task, i) => {
                        return (
                            <div className={"border-l-[1px]"} key={i}>

                                <TaskTodo item={item} task={task} user={user} setAllTasks={setAllTasks}
                                          setSaving={setSaving}
                                          allNotes={allNotes}
                                          loggedInUser={loggedInUser}
                                          setAllNotes={setAllNotes}/>


                            </div>
                        )
                    })}


                </div>


            </div>

        </div>
    );
}

export default ReferralContainer;
