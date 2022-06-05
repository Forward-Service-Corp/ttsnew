import React, {useEffect, useState} from 'react';
import CarePlanDomain from "./carePlanDomain";
import {Trash} from "phosphor-react";

function ReferralContainer({item, user}) {
    const [open, setOpen] = useState(false)
    const [task, setTask] = useState("")
    const [allTasks, setAllTasks] = useState([])

    async function saveTask() {
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
                timestamp: new Date()
            })
        })
    }

    async function setTaskStatus(taskId, setTo) {
        await fetch("/api/update-task-status?taskId=" + taskId + "&setTo=" + setTo)
    }

    async function deleteTask(taskId) {
        await fetch("/api/delete-task?taskId=" + taskId)
    }

    async function getTasks() {
        const fetchedTasks = await fetch("/api/get-tasks?userId=" + user.email + "&referralId=" + item._id)
            .then(res => res.json())
        await setAllTasks(fetchedTasks)
    }

    useEffect(() => {
        getTasks().then()
    }, [])

    return (
        <div className={"my-3"} key={item._id}>
            <div className={"flex justify-between bg-gray-200 rounded shadow"}>
                <div className={"p-3"}>
                    <h2>{item.name}</h2>
                </div>
                <div className={"p-4 text-indigo-600 cursor-pointer text-xs"} onClick={() => {
                    setOpen(!open)
                }}>{open ? "Collapse" : "Expand"}</div>
            </div>

            <div className={`flex ${open ? "visible" : "hidden"} flex-col md:flex-row`}>
                <CarePlanDomain item={item}/>
                <div className={"w-full p-5 inline"}>
                    <h2 className={"uppercase text-gray-500"}>Add a new task</h2>
                    <input type={"text"} className={"w-full rounded mt-2"} value={task} onChange={(e) => {
                        setTask(e.target.value)
                    }}/>
                    <button
                        className={"mt-2 mb-4 bg-indigo-600 text-white px-6 py-2 rounded text-xs disabled:bg-gray-400"}
                        onClick={() => {
                            saveTask().then(() => {
                                getTasks().then()
                            })
                            setTask("")
                        }} disabled={task === ""}>Save task
                    </button>

                    <div className={"uppercase text-gray-500 text-sm mb-1"}>Todos</div>
                    {allTasks && allTasks.filter(item => eval(item.completed) === false).map((task) => {
                        return (
                            <div className={"flex justify-start align-middle mb-1"} key={task._id}>
                                <input type={"checkbox"} className={"mr-2 rounded"} onChange={() => {
                                    setTaskStatus(task._id, true).then(() => {
                                        getTasks().then()
                                    })
                                }}/>
                                <div className={"text-xs "}>{task.task} -</div>
                                <div className={"cursor-pointer"}
                                     onClick={() => {
                                         if (confirm("Do you want to delete this task? This action is permanent.")) {
                                             deleteTask(task._id)
                                                 .then(() => {
                                                     getTasks().then()
                                                 })
                                         }
                                     }}><Trash size={16} weight="thin"/></div>
                            </div>
                        )
                    })}

                    <div className={"uppercase text-gray-500 text-sm mt-4"}>Completed</div>
                    {allTasks && allTasks.filter(item => eval(item.completed) === true).map((task) => {
                        return (
                            <div key={task._id}>
                                <input type={"checkbox"} className={"mr-2 rounded"} checked={true} onChange={() => {
                                    setTaskStatus(task._id, false).then(() => {
                                        getTasks().then()
                                    })
                                }}/>
                                <span className={"text-xs line-through"}>{task.task}</span>
                            </div>
                        )
                    })}
                </div>


            </div>

        </div>
    );
}

export default ReferralContainer;
