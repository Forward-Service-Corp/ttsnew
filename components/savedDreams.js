import DreamSingle from "./dreamSingle";
import {useEffect, useState} from "react";

function SavedDreams({user, status}) {

    const [dreams, setDreams] = useState([])

    async function getDreams() {
        const newDreams = await fetch("/api/get-dreams?userId=" + user.email + "&status=" + status)
            .then(res => res.json())
        setDreams(newDreams)
    }

    useEffect(() => {
        getDreams().then()
    }, [dreams])

    return (
        <div>
            <div>{dreams?.length ? <h2 className={" mb-5 uppercase"}>{status} Dreams</h2> : null}</div>
            <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
                {dreams?.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).map(dream => (
                    <DreamSingle key={dream._id} dream={dream} getDreams={getDreams}/>
                ))}
            </div>
        </div>
    )

}

export default SavedDreams;
