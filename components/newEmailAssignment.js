import React, {useState} from 'react';

function NewEmailAssignment({viewingUserState, setViewingUserState}) {

    const [newEmail, setNewEmail] = useState( "");

    async function assignUser() {
        await fetch("/api/assignUser?userId=" + viewingUserState._id + "&toId=" + newEmail)
            .then(res => res.json())
            .then(res => {setViewingUserState(res)})
            .catch(err => console.warn(err))
    }

    return (
        <div className={"bg-gray-100 p-6 mb-5 rounded"}>
            <h2 className={"uppercase text-gray-500"}>New email assignment</h2>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-8"}>
                <div>
                    <div className={"flex flex-col"}>
                        <h3 className={"uppercase text-sm mt-4"}>Email to assign</h3>
                        <p className={"text-xs mb-4"}>This is the new email you wish to assign.</p>
                        <input id={"new-email"} disabled={false} className={"flex-1 mr-4"} type={"text"} value={newEmail} onChange={(e) => {
                            setNewEmail(e.target.value)
                        }}/>
                    </div>
                </div>
            </div>
            <div className={"flex justify-start mt-4 pt-4 border-t-[1px] border-gray-400"}>
                <button
                    disabled={newEmail === ""}
                    onClick={() => {
                        if (confirm(`Are you absolutely sure you want to reassign all dreams, life area surveys, referrals, tasks, and notes to email ${newEmail}`)) {
                            assignUser().then()
                            setNewEmail("")
                        }
                    }}
                    className={"py-2 px-6 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>
                    Assign new email
                </button>
            </div>
        </div>
    );
}

export default NewEmailAssignment;
