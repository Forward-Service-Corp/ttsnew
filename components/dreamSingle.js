import React, {useState} from 'react';
import {useRouter} from "next/router";
import {Brain} from "phosphor-react";
import moment from "moment";

function DreamSingle({dream, deleteDream, isClientDream, clientId}) {

    const [editMode, setEditMode] = useState(false)
    const [updateSuccess, setUpdateSuccess] = useState(false)
    const [newDream, setNewDream] = useState(dream.dream)
    const [need, setNeed] = useState(dream.dreamNeed)
    const [help, setHelp] = useState(dream.dreamHelp)

    async function updateDream(id) {
        await fetch("/api/update-dream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dreamId: id,
                dream: newDream,
                dreamNeed: need,
                dreamHelp: help
            })
        })
    }

    const router = useRouter()
    return (
        <div className={"mb-4 flex flex-col shadow rounded overflow-hidden justify-between bg-white"}>
            <div>
                <div className={"bg-gray-700 p-2 text-white text-sm font-light flex items-center"}>
                    <div><Brain size={26} weight="thin"/></div>
                    <div className={`ml-2 truncate ${editMode ? "hidden" : "visible"}`}>{newDream}</div>
                    <input
                        type={"text"}
                        className={`${editMode ? "visible" : "hidden"} p-0 ml-2 bg-gray-700 border-0 w-full border-b-[1px] text-sm font-light`}
                        placeholder={newDream}
                        value={newDream}
                        onChange={(e) => {
                            setNewDream(e.target.value)
                        }}/>
                </div>
                <div
                    className={"bg-gray-200 px-2 py-2 text-xs relative"}>
                    {moment(dream.timestamp).format("MMMM Do YYYY @ h:mm a")}
                    <div className={`absolute right-2 top-2 text-red-600 ${editMode ? "visible" : "hidden"}`}>Editing
                    </div>
                    <div
                        className={`absolute right-2 top-2 text-green-600 ${updateSuccess ? "visible" : "hidden"}`}>Update
                        successful
                    </div>
                </div>
                <div>
                    <div className={"px-5 py-5"}>
                        <p className={"text-xs text-gray-500 "}>What I need:</p>
                        <p className={`text-sm mt-0 ${editMode ? "hidden" : "visible"}`}>{need}</p>
                        <input type={"text"}
                               className={`${editMode ? "visible" : "hidden"} p-0  border-0 w-full border-b-[1px] text-sm font-light`}
                               placeholder={need} value={need}
                               onChange={(e) => {
                                   setNeed(e.target.value)
                               }}/>
                    </div>
                    <div className={"px-5 pb-5"}>
                        <p className={"text-xs text-gray-500  "}>Who I need to help me is: </p>
                        <p className={`text-sm mt-0  ${editMode ? "hidden" : "visible"}`}>{help}</p>
                        <input type={"text"}
                               className={`${editMode ? "visible" : "hidden"} p-0  border-0 w-full border-b-[1px] text-sm font-light`}
                               placeholder={help} value={help}
                               onChange={(e) => {
                                   setHelp(e.target.value)
                               }}/>
                    </div>
                </div>
            </div>

            <div className={"flex text-xs text-center"}>

                <div className={"bg-gradient-to-t from-orange-600 to-orange-400 text-white p-2 flex-1 cursor-pointer"}
                     onClick={() => {
                         if (isClientDream) {
                             router.push("/new-life-area-survey?dreamName=" + dream.dream + "&dreamId=" + dream._id + "&clientId=" + clientId).then()
                         } else {
                             router.push("/new-life-area-survey?dreamName=" + dream.dream + "&dreamId=" + dream._id).then()
                         }

                     }}>Life Area Survey
                </div>

                <div className={"bg-gradient-to-t from-gray-600 to-gray-400 text-white p-2 flex-1 cursor-pointer"}
                     onClick={() => {
                         setEditMode(!editMode)
                         if (editMode) {
                             updateDream(dream._id).then(() => {
                                 setUpdateSuccess(true)
                                 setTimeout(() => {
                                     setUpdateSuccess(false)
                                 }, 3000)
                             })
                         }
                     }}>{editMode ? "Save" : "Edit"}
                </div>

                <div className={"bg-gradient-to-t from-red-700 to-red-500 text-white p-2 flex-1 cursor-pointer"}
                     onClick={() => {
                         if (confirm("Are you sure you want to delete this dream?")) {
                             deleteDream(dream._id).then()
                         }
                     }}>Delete
                </div>

            </div>
        </div>
    );
}

export default DreamSingle;
