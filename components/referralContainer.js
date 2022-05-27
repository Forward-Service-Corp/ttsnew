import React, {useEffect, useState} from 'react';

function ReferralContainer({item, user}) {
    const [open, setOpen] = useState(false)
    const [task, setTask] = useState("")
    const [allTasks, setAllTasks] = useState([])

    async function saveTask () {
        await fetch("/api/save-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                referralId: item._id,
                userId: user._id,
                task: task,
                surveyId: item.surveyId,
                timestamp: new Date()
            })
        })
    }

    async function setTaskStatus (taskId, setTo) {
        await fetch("/api/update-task-status?taskId=" + taskId + "&setTo=" + setTo)
    }

    async function deleteTask (taskId, setTo) {
        await fetch("/api/delete-task?taskId=" + taskId)
    }

    async function getTasks () {
        const fetchedTasks = await fetch("/api/get-tasks?userId=" + user._id + "&referralId=" + item._id)
            .then(res=> res.json())
        await setAllTasks(fetchedTasks)
    }

    useEffect(() => {
        getTasks()
            .then((res) => {
                console.log(res)
            })
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
            <div className={`flex ${open ? "visible" : "hidden"}`}>
                <div className={"w-1/2 p-5 inline"}>
                    <h2 className={"uppercase text-gray-500"}>Add a new task</h2>
                    <input type={"text"} className={"w-full rounded mt-2"} value={task} onChange={(e) => {
                        setTask(e.target.value)
                    }}/>
                    <button className={"mt-2 mb-4 bg-indigo-600 text-white px-6 py-2 rounded text-xs disabled:bg-gray-400"} onClick={() => {
                        saveTask().then(() => {getTasks().then()})
                        setTask("")
                    }} disabled={task === ""}>Save task</button>

                    <div className={"uppercase text-gray-500 text-sm"}>Todos</div>
                    {allTasks && allTasks.filter(item => eval(item.completed) === false).map((task, i) => {
                        return (
                            <div key={task._id}>
                                <input type={"checkbox"} className={"mr-2 rounded"} onChange={() => {
                                    setTaskStatus(task._id, true).then(() => {getTasks().then()})
                                }}/>
                                <span className={"text-xs"}>{task.task} - </span> <span className={"bg-red-600 py-0.5 px-1.5 rounded-full text-white text-xs cursor-pointer"}
                            onClick={() => {
                                if(confirm("Do you want to delete this task? This action is permanent.")){
                                    deleteTask(task._id)
                                        .then(() => {getTasks().then()})
                                }
                            }}>X</span>
                            </div>
                        )
                    })}

                    <div className={"uppercase text-gray-500 text-sm mt-4"}>Completed</div>
                    {allTasks && allTasks.filter(item => eval(item.completed) === true).map((task, i) => {
                        return (
                            <div key={task._id}>
                                <input type={"checkbox"} className={"mr-2 rounded"} checked={true} onChange={() => {
                                    setTaskStatus(task._id, false).then(() => {getTasks().then()})
                                }}/>
                                <span className={"text-xs line-through"}>{task.task}</span>
                            </div>
                        )
                    })}
                </div>
                <div className={"w-1/2 text-sm p-5 inline bg-gray-100 bg-opacity-50 m-3 rounded"}>
                    {item.domain !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Domain: </p>
                        <p>{item.domain}</p></div>) : null}

                    {item.phone !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Phone: </p>
                        <p>{item.phone}</p></div>) : null}

                    {item.email !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Email: </p>
                        <p>{item.email}</p></div>) : null}

                    {item.contact !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Contact person: </p>
                        <p>{item.contact}</p></div>) : null}

                    {item.url !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Website: </p>
                        <p>{item.url}</p></div>) : null}

                    {item.requirements !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Requirements: </p>
                        <p>{item.requirements}</p></div>) : null}

                    {item.needs !== null ? (<div className={"mb-3"}><p className={"text-xs uppercase text-gray-500"}>Need to bring: </p>
                        <p>{item.needs}</p></div>) : null}
                </div>

            </div>

        </div>
    );
}

export default ReferralContainer;
