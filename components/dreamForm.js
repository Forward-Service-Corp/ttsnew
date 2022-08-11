import {useState} from "react";
import {useRouter} from "next/router";

function DreamForm({setSavedDreams, user, setIsLoading}) {
    const [dream, setDream] = useState("")
    const [dreamNeed, setDreamNeed] = useState("")
    const [dreamHelp, setDreamHelp] = useState("")
    const router = useRouter()

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
        <div className={" rounded shadow-xl overflow-hidden mt-10 md:mt-0"}>
            <h2 className={"font-light uppercase px-4 py-2 bg-orange-600 text-white"}>Define a new dream</h2>

            <div className={"p-4"}>
                <p className={" text-sm text-orange-600"}>Your dream</p>
                <input
                    className={"w-full border-r-0 border-t-0 border-l-0 border-black border-b-[1px] placeholder:text-xs pl-1"}
                    type={"text"}
                    placeholder={"Type your dream here..."}
                    onChange={(e) => {
                        setDream(e.target.value)
                    }} value={dream}/>

                <p className={" mt-5 text-sm text-orange-600"}>What do you need to do to achieve this
                    dream?</p>
                <input
                    className={"w-full border-r-0 border-t-0 border-l-0 border-black border-b-[1px] placeholder:text-xs pl-1"}
                    type={"text"}
                    placeholder={"Type what you need here..."}
                    onChange={(e) => {
                        setDreamNeed(e.target.value)
                    }} value={dreamNeed}/>

                <p className={" mt-5 text-sm text-orange-600"}>Whose help do you need to achieve this
                    dream?</p>
                <input
                    className={"w-full border-r-0 border-t-0 border-l-0 border-black border-b-[1px] placeholder:text-xs pl-1"}
                    type={"text"}
                    placeholder={"Type whose help you need here..."}
                    onChange={(e) => {
                        setDreamHelp(e.target.value)
                    }} value={dreamHelp}/>

                <button
                    className={"p-2 mt-4 text-white rounded text-xs bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}
                    disabled={dream === ""}
                    onClick={() => {
                        setIsLoading(true)
                        saveDream()
                            .then(() => {
                                // getDreams().then(res => console.log(res)).catch(err => console.warn(err))
                            })
                            .then(() => {
                                // setIsLoading(false)
                            })
                            .catch(err => console.warn(err))
                        setDream("")
                        setDreamNeed("")
                        setDreamHelp("")
                        router.reload()
                    }}>Save dream
                </button>
            </div>
        </div>
    );
}

export default DreamForm;
