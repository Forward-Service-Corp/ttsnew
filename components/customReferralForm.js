import React, {useState} from 'react';

function CustomReferralForm({
                                domain,
                                setCurrentReferral,
                                referrals,
                                clientId,
                                currentReferral,
                                user,
                                router,
                                userReferrals,
                                setUserReferrals,
                                getUserReferrals
                            }) {

    const [referralOpen, setReferralOpen] = useState(false)
    const [referralName, setReferralName] = useState("")
    const [referralPhone, setReferralPhone] = useState("")
    const [referralEmail, setReferralEmail] = useState("")
    const [referralContact, setReferralContact] = useState("")
    const [referralHours, setReferralHours] = useState("")
    const [referralRequirements, setReferralRequirements] = useState("")
    const [referralWebsite, setReferralWebsite] = useState("")
    const [referralNeeds, setReferralNeeds] = useState("")

    async function saveCustomReferral() {
        const id = clientId === undefined ? user.email : clientId
        await fetch("/api/save-custom-referral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                surveyId: router.query.surveyId,
                userId: id,
                dream: router.query.dream,
                domain: domain,
                name: referralName,
                email: referralEmail,
                phone: referralPhone,
                hours: referralHours,
                requirements: referralRequirements,
                url: referralWebsite,
                contact: referralContact,
                needs: referralNeeds
            })
        })
    }

    return (
        <div>
            <div className={`my-4 p-3 bg-gray-100 text-xs divide-y ${referralOpen ? "visible" : "hidden"}`}>
                <div className={"flex justify-between items-center py-3"}>
                    <div>
                        <h2 className={"uppercase text-gray-600"}>Add custom referral to {domain}</h2>
                    </div>
                    <div>
                        <button onClick={() => {
                            setReferralOpen(false)
                            setReferralName("")
                            setReferralPhone("")
                            setReferralEmail("")
                            setReferralContact("")
                            setReferralHours("")
                            setReferralRequirements("")
                            setReferralWebsite("")
                            setReferralNeeds("")
                        }} className={"text-red-600 underline"}>Cancel
                        </button>
                    </div>
                </div>

                <div className={"py-2"}>
                    <div className={"py-1 text-gray-600"}>Name</div>
                    <input className={"text-xs w-full"} placeholder={"Name..."} type="text" value={referralName}
                           onChange={(e) => {
                               setReferralName(e.target.value)
                           }}/>
                </div>

                <div className={"py-2"}>
                    <div className={"py-1 text-gray-600"}>Phone</div>
                    <input className={"text-xs w-full"} placeholder={"Phone..."} type="text" value={referralPhone}
                           onChange={(e) => {
                               setReferralPhone(e.target.value)
                           }}/>
                </div>

                <div className={"py-2"}>
                    <div className={"py-1 text-gray-600"}>Email</div>
                    <input className={"text-xs w-full"} placeholder={"Email..."} type="text" value={referralEmail}
                           onChange={(e) => {
                               setReferralEmail(e.target.value)
                           }}/>
                </div>

                <div className={"py-2"}>
                    <div className={"py-1 text-gray-600"}>Contact person</div>
                    <input className={"text-xs w-full"} placeholder={"Contact person..."} type="text"
                           value={referralContact} onChange={(e) => {
                        setReferralContact(e.target.value)
                    }}/>
                </div>

                <div className={"py-2"}>
                    <div className={"py-1 text-gray-600"}>Hours</div>
                    <input className={"text-xs w-full"} placeholder={"Hours..."} type="text" value={referralHours}
                           onChange={(e) => {
                               setReferralHours(e.target.value)
                           }}/>
                </div>

                <div className={"py-2"}>
                    <div className={"py-1 text-gray-600"}>Requirements</div>
                    <input className={"text-xs w-full"} placeholder={"Requirements..."} type="text"
                           value={referralRequirements} onChange={(e) => {
                        setReferralRequirements(e.target.value)
                    }}/>
                </div>

                <div className={"py-2"}>
                    <div className={"py-1 text-gray-600"}>Website</div>
                    <input className={"text-xs w-full"} placeholder={"Website..."} type="text" value={referralWebsite}
                           onChange={(e) => {
                               setReferralWebsite(e.target.value)
                           }}/>
                </div>

                <div className={"py-2"}>
                    <div className={"py-1 text-gray-600"}>Need to bring</div>
                    <input className={"text-xs w-full"} placeholder={"Need to bring..."} type="text"
                           value={referralNeeds} onChange={(e) => {
                        setReferralNeeds(e.target.value)
                    }}/>
                </div>

                <div className={"py-3 flex justify-end"}>
                    <button
                        onClick={() => {
                            saveCustomReferral().then(() => {
                                getUserReferrals()
                            })
                            setReferralOpen(false)
                            setReferralName("")
                            setReferralPhone("")
                            setReferralEmail("")
                            setReferralContact("")
                            setReferralHours("")
                            setReferralRequirements("")
                            setReferralWebsite("")
                            setReferralNeeds("")
                        }}
                        className={"px-6 py-2 text-xs rounded text-white bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}>
                        + Save custom referral
                    </button>
                </div>

            </div>
            <div className={"flex justify-end pt-4"}>
                <button onClick={() => {
                    setReferralOpen(!referralOpen)
                }} className={"text-xs underline text-orange-500"}>Add custom referral
                </button>
            </div>
        </div>
    );
}

export default CustomReferralForm;
