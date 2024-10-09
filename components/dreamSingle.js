import React, {useState} from 'react';
import {useRouter} from "next/router";
import {Brain, Trash, NotePencil, FloppyDisk} from "phosphor-react";
import moment from "moment";

function DreamSingle({dream, isClientDream, clientId, setSavedDreams, number}) {

    const [editMode, setEditMode] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [newDream, setNewDream] = useState(dream.dream.toString())
    const [need, setNeed] = useState(dream.dreamNeed.toString())
    const [help, setHelp] = useState(dream.dreamHelp.toString())
    const [currentStatus, setCurrentStatus] = useState(dream.status || "active")

    async function updateDream(value, id) {
        await changeDreamStatus(value, id)
        await fetch("/api/update-dream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dreamId: id,
                dream: newDream,
                dreamNeed: need,
                dreamHelp: help,
                dreamStatus: value
            })
        })
            .then(r => r.json())
    }

    const changeDreamStatus = (value, id) => {
         setSavedDreams((prevDreams) =>
            prevDreams.map((dream) =>
                dream._id === id
                    ? { ...dream, status: value }
                    : dream
            )
        );
    };

    const statusStyles = (status) => {
        switch (status) {
            case "active":
                return 'bg-green-500'
            case "complete":
                return 'bg-blue-500'
            case "archived":
                return 'bg-gray-500'
        }
    }

    async function deleteDream(dreamId) {
       await fetch("/api/delete-dream?dreamId=" + dreamId)
           .then(r => r.json())
           .then(r => setSavedDreams(r) )
    }

    const router = useRouter()
    return (
        <div className={"mb-4 flex flex-col shadow-xl justify-between bg-white rounded-lg overflow-x-hidden"}>
            <div>
                <div className={"bg-gray-700 p-4 text-white items-center relative"}>
                    <div className={`truncate text-xl font-extralight capitalize`}>{newDream}</div>
                    <div className={`truncate text-xs font-extralight`}>
                        {moment(dream.timestamp).format("MMMM Do YYYY @ h:mm a")}
                    </div>
                    <div className={`${statusStyles(dream.status)} capitalize right-4 absolute top-6 px-4 py-1 text-xs text-white rounded-full`}>{dream.status}</div>
                </div>
                <div className={'px-4 text-sm'}>
                    <div className={`${editMode ? "visible" : "hidden"}`}>
                        <p className={"mb-2 text-xs"}>Status:</p>
                        <select className={`rounded w-full border-gray-200 text-sm`}
                                id={"statusSelect" + dream._id}
                                value={currentStatus}
                                disabled={!editMode}
                                onChange={(e) => {
                                    setCurrentStatus(e.target.value)
                                }}>
                            <option value="active">Active</option>
                            <option value="complete">Complete</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                    <div className={""}>
                        <p className={"mb-2 text-xs"}>What I need:</p>
                        <input type={"text"} id={"new-dreamNeed" + dream._id + "-" + number}
                               className={`w-full py-2 placeholder:text-sm rounded border-gray-200 placeholder:text-gray-400`}
                               placeholder={need}
                               value={need}
                               disabled={!editMode}
                               onChange={(e) => {
                                   setNeed(e.target.value)
                               }}/>
                    </div>
                    <div className={""}>
                        <p className={"mb-2 text-xs"}>Who I need to help me is: </p>
                        <input type={"text"} id={"new-dreamHelp-" + dream._id + "-" + number}
                               className={`w-full py-2 placeholder:text-sm rounded border-gray-200 placeholder:text-gray-400`}
                               placeholder={help} value={help}
                               disabled={!editMode}
                               onChange={(e) => {
                                   setHelp(e.target.value)
                               }}/>
                    </div>
                </div>
            </div>

            <div className={`${editMode ? 'hidden' : 'visible'} text-xs p-4 flex`}>
                <div
                    className={"grow bg-indigo-700 hover:bg-indigo-500 text-center text-white p-2 rounded-full mr-2 cursor-pointer"}
                    onClick={() => {
                        if (isClientDream) {
                            router.push("/new-life-area-survey?dreamName=" + dream.dream + "&dreamId=" + dream._id + "&clientId=" + clientId).then()
                        } else {
                            router.push("/new-life-area-survey?dreamName=" + dream.dream + "&dreamId=" + dream._id).then()
                        }

                    }}>Complete Life Area Survey
                </div>

                <div
                    className={`flex-auto bg-gray-500 hover:bg-gray-300 text-center text-white p-2 rounded-full mr-2 cursor-pointer`}
                    onClick={() => {
                        setEditMode(true)
                    }}>
                    Edit
                </div>

                <div
                    className={"flex-auto bg-red-500 hover:bg-red-300 text-center text-white p-2 rounded-full cursor-pointer"}
                    alt={"Delete this dream"}
                    onClick={() => {
                        if (confirm("Are you sure you want to delete this dream?")) {
                            deleteDream(dream._id).then()
                        }
                    }}>
                    Delete
                </div>

            </div>
            <div className={`${!editMode ? 'hidden' : 'visible'} text-xs p-4 flex`}>
                <div
                    className={`flex-auto bg-green-500 hover:bg-green-300 text-center text-white p-2 rounded-full mr-2 cursor-pointer`}
                    onClick={() => {
                        setEditMode(!editMode)
                        if (editMode) {
                            updateDream(currentStatus, dream._id).then(() => {
                                setUpdateSuccess(true)
                                setTimeout(() => {
                                    setUpdateSuccess(false)
                                }, 3000)
                            })
                        }
                    }}>
                    Save
                </div>
                <div
                    className={`flex-auto bg-red-500 hover:bg-red-300 text-center text-white p-2 rounded-full mr-2 cursor-pointer`}
                    onClick={() => {
                        setEditMode(!editMode)
                    }}>
                    Cancel
                </div>
            </div>
        </div>
    );
}

export default DreamSingle;
