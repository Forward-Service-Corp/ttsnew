import React, {useEffect, useState} from 'react';
import CarePlanDomain from "./carePlanDomain";
import {Trash, FilePlus, CaretDoubleDown, CaretDoubleUp} from "phosphor-react";
import TaskTodo from "./taskTodo";
import moment from "moment";
import NoteItem from "./noteItem";
import {labelMap} from "../lib/serviceLabelsMap";

function ReferralContainer({item, user, notes}) {
    const [open, setOpen] = useState(false)
    const [task, setTask] = useState("")
    const [allTasks, setAllTasks] = useState([])
    const [allNotes, setAllNotes] = useState(notes)

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
            <div className={"flex justify-start items-center text-sm bg-indigo-600 font-light text-white relative p-3"}>
                <div className={"w-[160px] ml-4 whitespace-nowrap mr-3 truncate"}>{labelMap[item.domain]}</div>
                <div className={"truncate max-w-[200px]"}>{item.name}</div>
                <div className={"absolute right-0 min-w-[100px] flex items-center justify-between h-full pl-3  bg-indigo-600"}>
                    <div>Tasks: {allTasks.filter(task => task.referralId === item._id && eval(task.completed) === false).length}</div>
                    <div className={"p-3 cursor-pointer text-xs"} onClick={() => {
                        setOpen(!open)
                    }}>{open ? <CaretDoubleUp size={20} weight="thin"/> :
                        <CaretDoubleDown size={20} weight="thin"/>}</div>
                </div>
            </div>

            <div className={`flex ${open ? "visible" : "hidden"} flex-col md:flex-row`}>
                <CarePlanDomain item={item}/>
                <div className={"w-full p-5 inline"}>
                    <h2 className={"uppercase text-indigo-600 mb-2"}>Add a new task</h2>
                    <input type={"text"} className={"w-full border-0 border-b-[1px] p-0 text-sm font-light"} value={task} placeholder={"Enter new todo item..."} onChange={(e) => {
                        setTask(e.target.value)
                    }}/>
                    <div className={"flex justify-end"}>
                        <button
                            className={"mt-2 mb-4 bg-indigo-600 text-white px-4 py-1 rounded text-xs disabled:bg-gray-400"}
                            onClick={() => {
                                saveTask().then(() => {
                                    getTasks().then()
                                })
                                setTask("")
                            }} disabled={task === ""}>Save task
                        </button>
                    </div>

                    <div className={"uppercase text-indigo-600 text-sm mb-1"}>Tasks</div>
                    {allTasks && allTasks.filter(item => eval(item.completed) === false).map((task, i) => {
                        return (
                            <div className={"border-l-[1px]"} key={i}>
                                <TaskTodo item={item} task={task} user={user} setAllTasks={setAllTasks} setAllNotes={setAllNotes}/>
                                {allNotes && allNotes.filter(note => note.taskId === task._id.toString()).map(noteItem => {
                                    return (
                                        <NoteItem key={noteItem._id} noteItem={noteItem}/>
                                    )
                                })}
                            </div>
                        )
                    })}

                    {allTasks && allTasks.filter(item => eval(item.completed) === true).length > 0 ? <div className={"uppercase text-indigo-600 text-sm mt-4"}>Completed</div> : null}

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
