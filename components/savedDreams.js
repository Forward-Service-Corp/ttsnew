import {useRouter} from "next/router";

function SavedDreams({savedDreams, setLoadingState, saveDreams, user}) {
    const router = useRouter()

    async function getDreams() {
        const newDreams = await fetch("/api/get-dreams?userId=" + user.email)
            .then(res => res.json())
        saveDreams(newDreams)
    }

    async function deleteDream(dreamId) {
        setLoadingState(true)
        await fetch("/api/delete-dream?dreamId=" + dreamId)
        getDreams().then(() => {setLoadingState(false)})
    }

    return (
        <div>
            <div>{savedDreams && savedDreams.length ?
                <h2 className={"text-xl mt-14 mb-5 uppercase"}>My Dreams</h2> : null}</div>

            <div className={"grid grid-cols-2 gap-4"}>
                {savedDreams && savedDreams.map((dream, i) => (
                <div key={i} className={"mb-4 flex p-3 shadow rounded"}>
                    <div className={" flex-2"}>
                        <div>
                            <p className={"uppercase text-indigo-600"}>{dream.dream}</p>
                            <p className={"text-xs text-gray-500 mt-3 uppercase"}>What I need: </p>
                            <p className={"text-sm"}>{dream.dreamNeed}</p>
                            <p className={"text-xs text-gray-500 mt-3 uppercase"}>Who I need to help me is: </p>
                            <p className={"text-sm"}>{dream.dreamHelp}</p>
                        </div>

                    </div>
                    <div className={"align-middle flex-1 p-2 justify-end flex "}>
                        <div className={"self-center text-right "}>
                            <button className={"w-auto block px-4 py-2 bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded text-white text-xs hover:shadow-indigo-500/10"}
                                    onClick={() => {
                                        router.push("/life-area-surveys?dream=" + dream.dream + "&dreamId=" + dream._id)
                                    }}
                            >Survey dream
                            </button>
                            <button className={"text-xs text-white bg-red-600 shadow-lg shadow-red-500/50 rounded px-4 py-2 cursor-pointer my-3"}
                                    onClick={() => {
                                        if (confirm("Are you sure you want to delete this dream?")) {
                                            deleteDream(dream._id).then()
                                        }

                                    }}>
                                Delete dream
                            </button>
                        </div>
                    </div>
                </div>))}
            </div>
        </div>
    );
}

export default SavedDreams;
