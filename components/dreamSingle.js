import React from 'react';
import {useRouter} from "next/router";
import {Brain} from "phosphor-react";
import moment from "moment";

function DreamSingle({dream, deleteDream, isClientDream, clientId}) {
    const router = useRouter()
    return (
        <div className={"mb-4 flex flex-col shadow rounded overflow-hidden justify-between bg-white"}>
            <div>
                <div className={"bg-gray-700 p-2 text-white text-sm font-light flex items-center"}>
                    <div ><Brain size={26} weight="thin"/></div>
                    <div className={"ml-2 truncate"}>{dream.dream}</div>
                </div>
                <div
                    className={"bg-gray-200 px-2 py-2 text-xs"}>{moment(dream.timestamp).format("MMMM Do YYYY @ h:mm a")}</div>
                <div>
                    <div className={"px-5 py-5"}>
                        <p className={"text-xs text-gray-500 "}>What I need:</p>
                        <p className={"text-sm mt-0"}>{dream.dreamNeed}</p>
                    </div>
                    <div className={"px-5 pb-5"}>
                        <p className={"text-xs text-gray-500  "}>Who I need to help me is: </p>
                        <p className={"text-sm mt-0"}>{dream.dreamHelp}</p>
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

                     }}>Survey
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
