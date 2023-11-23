import React, {useState} from 'react';

function NewEmailAssignment({user}) {

    const [previousEmail, setPreviousEmail] = useState("")
    const [newEmail, setNewEmail] = useState(user || "")
    const [lookupResults, setLookupResults] = useState({})

    async function lookupUser() {
        const lookup = await fetch("/api/lookupUser?userId=" + previousEmail)
            .then(res => res.json())
        await setLookupResults(lookup)
    }

    async function assignUser() {
        await fetch("/api/assignUser?fromId=" + previousEmail + "&toId=" + newEmail)
    }

    return (
        <div className={"bg-gray-100 p-6 mb-5 rounded"}>
            <h2 className={"uppercase text-gray-500"}>New email assignment</h2>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-8"}>
                <div className={"flex flex-col"}>
                    <div className={"flex flex-col"}>
                        <h3 className={"uppercase text-sm mt-4"}>Previous email lookup</h3>
                        <p className={"text-xs mb-4"}>Enter the last known email address for the user.</p>
                    </div>
                    <div className={"flex justify-between"}>
                        <input id={"previous-email"} placeholder={"emailaddress@domain.com"} className={"flex-1 mr-4"} type={"text"}
                               value={previousEmail} onChange={(e) => {
                            setPreviousEmail(e.target.value)
                        }}/>
                        <button
                            onClick={lookupUser}
                            className={"py-2 px-6 text-white text-sm rounded bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>
                            Look up email
                        </button>
                    </div>
                    <div>
                        <div className={"flex flex-col"}>
                            <h3 className={"uppercase text-sm mt-4"}>Lookup results for <span
                                className={"text-orange-500 lowercase"}>{previousEmail}</span></h3>
                            <p className={"text-xs"}>Latest dream: <span
                                className={"font-bold"}>{lookupResults.dreams?.length > 0 ? lookupResults.dreams[0].dream : "No dreams for this user"}</span>
                            </p>
                            <p className={"text-xs"}>{lookupResults.dreams?.length} - Dream(s)</p>
                            <p className={"text-xs"}>{lookupResults.surveys?.length} - Life Area Survey(s)</p>
                            <p className={"text-xs"}>{lookupResults.referrals?.length} - Referral(s)</p>
                            <p className={"text-xs"}>{lookupResults.tasks?.length} - Task(s)</p>
                            <p className={"text-xs"}>{lookupResults.notes?.length} - Note(s)</p>
                        </div>
                    </div>
                </div>
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
                    disabled={previousEmail === "" || newEmail === ""}
                    onClick={() => {
                        if (confirm(`Are you absolutely sure you want to reassign all dreams, life area surveys, referrals, tasks, and notes from user ${previousEmail} to user ${newEmail}`)) {
                            assignUser().then()
                            setNewEmail("")
                            setPreviousEmail("")
                            setLookupResults({})
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
