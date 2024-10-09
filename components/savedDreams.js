import DreamSingle from "./dreamSingle";

function SavedDreams({savedDreams, setSavedDreams}) {


    return (
            <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
                {savedDreams?.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).map((dream, i) => (
                    <DreamSingle key={dream._id} dream={dream} setSavedDreams={setSavedDreams} number={i}/>
                ))}
            </div>
    )

}

export default SavedDreams;
