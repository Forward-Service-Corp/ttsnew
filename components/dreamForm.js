import {useState} from "react";

function DreamForm({setSavedDreams, user, setIsLoading}) {
    const [dream, setDream] = useState("")
    const [dreamNeed, setDreamNeed] = useState("")
    const [dreamHelp, setDreamHelp] = useState("")

    async function saveDream() {
        await fetch("/api/post-dream", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dream,
                dreamNeed,
                dreamHelp,
                userId: user.email
            })
        })
    }

    async function getDreams() {
        const newDreams = await fetch("/api/get-dreams?userId=" + user.email)
            .then(res => res.json())
        await setSavedDreams(newDreams)
    }

    return (
        <div className={"py-8 border-t-2 border-b-2 mt-8"}>
            <h2 className={"text-xl uppercase mb-5"}>Define a new dream</h2>

            <p className={"uppercase mb-2 text-sm text-gray-500"}>Your dream</p>
            <input className={"w-full rounded"} type={"text"} onChange={(e) => {
                setDream(e.target.value)
            }} value={dream}/>

            <p className={"uppercase mb-2 mt-5 text-sm text-gray-500"}>What do you need to do to achieve this
                dream?</p>
            <input className={"w-full rounded"} type={"text"} onChange={(e) => {
                setDreamNeed(e.target.value)
            }} value={dreamNeed}/>

            <p className={"uppercase mb-2 mt-5 text-sm text-gray-500"}>Whose help do you need to achieve this
                dream?</p>
            <input className={"w-full rounded"} type={"text"} onChange={(e) => {
                setDreamHelp(e.target.value)
            }} value={dreamHelp}/>

            <button className={"p-2 mt-4 bg-indigo-700 text-white rounded text-xs"} onClick={() => {
                setIsLoading(true)
                saveDream()
                    .then(() => {
                        getDreams().then(res => console.log(res)).catch(err => console.warn(err))
                    })
                    .then(() => {
                        setIsLoading(false)
                    })
                    .catch(err => console.warn(err))
                setDream("")
                setDreamNeed("")
                setDreamHelp("")
            }}>Save dream
            </button>
        </div>
    );
}

export default DreamForm;
