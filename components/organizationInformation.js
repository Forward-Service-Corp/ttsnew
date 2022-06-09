import {useEffect, useState} from "react";

function OrganizationInformation({user}) {

    const [coaches, setCoaches] = useState([])

    async function getCoaches () {
        const fetchCoaches = await fetch("/api/get-coaches", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                coaches: user.coach
            })
        }).then(res => res.json())
        setCoaches(fetchCoaches)
    }

    useEffect(() => {
        getCoaches().then()
    }, [])

    return (
        <div>
            <h2 className={"uppercase text-gray-600 font-light mb-3"}>Organization Information</h2>
            {user.coach === undefined ? <span className={"mb-6 block"}>You have no coaches</span> : <span className={"mb-6 block"}>Your Coaches:</span>}
            <div className={"grid grid-cols-3 gap-4"}>
                {coaches && coaches.map(coach => {
                    return (
                        <div key={coach} className={"rounded shadow overflow-hidden text-sm"}>
                            <div className={"bg-gray-700 p-2 text-white"}>{coach.name}</div>
                            <div className={"p-5"}>
                                <p>{coach.phone}</p>
                                <p>{coach.email}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    );
}

export default OrganizationInformation;
