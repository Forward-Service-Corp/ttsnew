import {useState} from "react";
import {useRouter} from "next/router";

function DreamForm({user, setSimpleModal, setSavedDreams}) {
    const [dream, setDream] = useState("")
    const [dreamNeed, setDreamNeed] = useState("")
    const [dreamHelp, setDreamHelp] = useState("")

    const handleSaveDream = async () => {
        setSimpleModal(true)
        await saveDream().then()
        setDream("")
        setDreamNeed("")
        setDreamHelp("")
    }

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
                userId: user._id,
                status: "active"
            })
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .then(() => {updateDreams()})
            .catch(err => console.log(err))
    }

    async function updateDreams() {
        await fetch(`/api/get-dreams?userId=${user._id}`)
            .then(res => res.json())
            .then(res => {setSavedDreams(res)})
    }

    return (
        <div className={" shadow-xl overflow-hidden mt-10 md:mt-0 rounded-lg flex flex-col justify-between text-xs"}>
            <h2 className={"font-extralight uppercase px-8 py-6 bg-gray-700 text-white text-xl"}>Define a new dream</h2>

            <div className={`mx-8`}>
                <p className={"mb-2"}>What is your dream?</p>
                <input
                    className={"w-full py-2 placeholder:text-sm rounded border-gray-200 placeholder:text-gray-400"}
                    id={`dream`}
                    type={"text"}
                    placeholder={"Type your dream here..."}
                    onChange={(e) => {
                        setDream(e.target.value)
                    }} value={dream}/>
            </div>

            <div className={`mx-8`}>
                <p className={"mb-2"}>What do you need to do to achieve this dream?</p>
                <input
                    className={"w-full py-2 placeholder:text-sm rounded border-gray-200 placeholder:text-gray-400"}
                    type={"text"}
                    id={`dreamNeed`}
                    placeholder={"Type what you need here..."}
                    onChange={(e) => {
                        setDreamNeed(e.target.value)
                    }} value={dreamNeed}/>
            </div>

            <div className={`mx-8`}>
                <p className={"mb-2"}>Whose help do you need to achieve this
                dream?</p>
                <input
                    className={"w-full py-2 placeholder:text-sm rounded border-gray-200 placeholder:text-gray-400"}
                    type={"text"}
                    id={`dreamHelp`}
                    placeholder={"Type whose help you need here..."}
                    onChange={(e) => {
                        setDreamHelp(e.target.value)
                    }} value={dreamHelp}/>
            </div>

            <div className={'w-full flex justify-end'}>
                <button
                    className={"block bg-indigo-700 hover:bg-indigo-500 my-4 text-white py-2 px-8 mr-8 text-center rounded-full disabled:bg-gray-400"}
                    disabled={dream === ""}
                    onClick={handleSaveDream}>Save dream
                </button>
            </div>
        </div>
    );
}

export default DreamForm;
