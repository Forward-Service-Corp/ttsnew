import {useEffect, useState} from "react";
import ProfileSectionStyle from "./ProfileSectionStyle";
import ProfileCoachSingle from "./profileCoachSingle";

function ProfileCoaches({user}) {

    const {coach} = user;

    // const [coaches, setCoaches] = useState([])

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

    // useEffect(() => {
    //     if(user.coach?.length > 0){
    //         fetch("/api/get-coaches", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 coaches: user.coach
    //             })
    //         }).then(res => res.json())
    //             .then(res => setCoaches(res))
    //     }
    // }, [user.coach, user.coach?.length])

    return (
        <ProfileSectionStyle title={`Coaches`}>
            <div className={`mt-4 text-sm`}>
                {user.coach === undefined || user.coach.length === 0 ? <span className={"mb-6 block"}>You have no coaches</span> : null}
            </div>
            <div className={"grid grid-cols-4 gap-4"}>
                {coach && coach.map(coach => (
                    <ProfileCoachSingle key={coach.key} coach={coach} />
                ))}
            </div>

        </ProfileSectionStyle>
    );
}

export default ProfileCoaches;
