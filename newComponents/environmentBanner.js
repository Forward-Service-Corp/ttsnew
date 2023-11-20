import {useEffect, useState} from "react";

export default function EnvironmentBanner() {
    const [environment, setEnvironment] = useState("production")


    useEffect(() => {
        const location = window.location.host
        if(location.indexOf("localhost") > -1){
            setEnvironment("dev")
        }else if(location.indexOf("-test") > -1){
            setEnvironment("testing")
        }
    }, [environment])

    return (
        <div className={`${environment === "dev" || environment === "testing" ? "visible" : "hidden"} p-4 text-center text-xs bg-pink-600 dark:bg-purple-900 text-white font-light`}>
            You are currently in the <strong className={`uppercase font-black`}>{environment}</strong> environment.
        </div>
    );
}
