import {useEffect, useState} from "react";
import ProfileSectionStyle from "./ProfileSectionStyle";

function ProfileCoaches({user}) {

    const [coaches, setCoaches] = useState([])

    // async function getCoaches () {
    //     const fetchCoaches = await fetch("/api/get-coaches", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             coaches: user.coach
    //         })
    //     }).then(res => res.json())
    //     setCoaches(fetchCoaches)
    // }

    useEffect(() => {
        if(user.coach?.length > 0){
            fetch("/api/get-coaches", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    coaches: user.coach
                })
            }).then(res => res.json())
                .then(res => setCoaches(res))
        }
    }, [user.coach, user.coach?.length])

    return (
        <ProfileSectionStyle title={`Coaches`}>
            <div className={`mt-4 text-sm`}>
                {user.coach === undefined || user.coach.length === 0 ? <span className={"mb-6 block"}>You have no coaches</span> : <span className={"mb-6 block"}>Your Coaches:</span>}
            </div>
            <div className={"grid grid-cols-3 gap-4"}>
                {coaches && coaches.map(coach => {
                    return (
                        <div key={coach} className={"rounded shadow overflow-hidden text-sm dark:bg-black"}>
                            <div className={"bg-gray-700 p-2 pl-4 text-white"}>{coach.name}</div>
                            <div className={"pb-5 pl-5 pt-3"}>
                                <p><span className={`font-bold dark:font-light dark:text-orange-400`}>Phone:</span> {coach.phone}</p>
                                <p><span className={`font-bold dark:font-light dark:text-orange-400`}>Email:</span> {coach.email}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </ProfileSectionStyle>
    );
}

export default ProfileCoaches;
