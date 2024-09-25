import DreamSingle from "./dreamSingle";

function SavedDreams({savedDreams, setSavedDreams}) {


    return (
        <div>
            <div>{savedDreams?.length ?
                <h2 className={" mb-5 uppercase dark:text-white"}>{"status"} Dreams</h2> : null}</div>
            <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
                {savedDreams?.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).map(dream => (
                    <DreamSingle key={dream._id} dream={dream} setSavedDreams={setSavedDreams}/>
                ))}
            </div>
        </div>
    )

}

export default SavedDreams;
