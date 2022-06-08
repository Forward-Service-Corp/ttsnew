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
        getDreams().then(() => {
            setLoadingState(false)
        })
    }

    return (
        <div>
            <div>{savedDreams && savedDreams.length ?
                <h2 className={"font-serif mt-14 mb-5 uppercase"}>My Dreams</h2> : null}</div>

            <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
                {savedDreams && savedDreams.map((dream, i) => (
                    <div key={i} className={"mb-4 flex flex-col shadow rounded overflow-hidden justify-between"}>
                        <div className={"bg-gray-700 p-2 text-white text-sm font-light"}>{dream.dream}</div>
                        <div className={"p-5"}>
                            <p className={"text-xs text-gray-500 "}>What I need: </p>
                            <p className={"text-sm mt-0"}>{dream.dreamNeed}</p>
                            <p className={"text-xs text-gray-500  "}>Who I need to help me is: </p>
                            <p className={"text-sm mt-0"}>{dream.dreamHelp}</p>
                        </div>

                        <div className={"flex text-xs text-center"}>

                            <div className={"bg-gradient-to-t from-orange-600 to-orange-400 text-white p-2 flex-1 cursor-pointer"}
                                 onClick={() => {
                                     router.push("/new-life-area-survey?dreamName=" + dream.dream + "&dreamId=" + dream._id)
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
                ))}
            </div>
        </div>
    );
}

export default SavedDreams;
