import DreamSingle from "./dreamSingle";

function SavedDreams({savedDreams, setLoadingState, saveDreams, user, title, status}) {

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
            <div>{savedDreams?.length ?
                <h2 className={" mb-5 uppercase"}>{title}</h2> : null}</div>

            <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
                {savedDreams?.filter(item => item.status === status).sort((a, b) => b.timestamp.localeCompare(a.timestamp)).map((dream, i) => (
                    <DreamSingle key={i} dream={dream} deleteDream={deleteDream} getDreams={getDreams}/>
                ))}
            </div>
        </div>
    )

}

export default SavedDreams;
