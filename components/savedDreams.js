import DreamSingle from "./dreamSingle";

function SavedDreams({savedDreams, setLoadingState, saveDreams, user}) {

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
                    <DreamSingle key={i} dream={dream} deleteDream={deleteDream}/>
                ))}
            </div>
        </div>
    );
}

export default SavedDreams;
