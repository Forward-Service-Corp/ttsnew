import React, {useEffect} from 'react';
import {labelMap} from "../lib/serviceLabelsMap";
import UserReferralItem from "./userReferralItem";

function ReferralSelects({
                             domains,
                             setCurrentReferral,
                             currentReferral,
                             user,
                             router,
                             referrals,
                             userReferrals,
                             setUserReferrals,
                             clientId
                         }) {

    async function getUserReferrals() {
        const id = clientId === undefined ? user.email : clientId
        const referrals = await fetch("/api/get-referrals?userId=" + id)
            .then(res => res.json())
        console.log("referrals")
        await setUserReferrals(referrals)
    }

    async function deleteReferral(id) {
        await fetch("/api/delete-referral?referralId=" + id)
    }

    async function saveReferral() {
        await fetch("/api/save-referral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dreamId: router.query.dreamId,
                surveyId: router.query.surveyId,
                userId: clientId === undefined ? user.email : clientId,
                dream: router.query.dream,
                domain: currentReferral.domain,
                name: currentReferral.name,
                email: currentReferral.email,
                phone: currentReferral.phone,
                hours: currentReferral.hours,
                requirements: currentReferral.requirements,
                url: currentReferral.url,
                contact: currentReferral.contact,
                needs: currentReferral.needs
            })
        })
    }


    return (
        <div className={"flex-1"}>
            {domains.map((domain, i) => {
                return (
                    <div key={i} className={" my-4 border-b-2 pb-4"}>
                        <div className={"text-sm mb-2"}><span
                            className={"text-gray-500"}>Life Area:</span> <p
                            className={"text-orange-600 text-lg"}>{labelMap[domain]}</p>
                        </div>

                        <div className={"flex"}>
                            <div className={"w-full"}>
                                <select id={domain} className={"w-full text-sm rounded"} onChange={(e) => {
                                    setCurrentReferral({
                                        domain: domain,
                                        name: e.target[e.target.selectedIndex].dataset.name,
                                        email: e.target[e.target.selectedIndex].dataset.email,
                                        phone: e.target[e.target.selectedIndex].dataset.phone,
                                        hours: e.target[e.target.selectedIndex].dataset.hours,
                                        requirements: e.target[e.target.selectedIndex].dataset.requirements,
                                        url: e.target[e.target.selectedIndex].dataset.url,
                                        contact: e.target[e.target.selectedIndex].dataset.contact,
                                        needs: e.target[e.target.selectedIndex].dataset.needs
                                    })

                                }}>
                                    <option value={`Please select a referral for ${labelMap[domain]}...`}>Please select
                                        a referral for {labelMap[domain]}...
                                    </option>
                                    {referrals && referrals.filter(item => item.service === domain).map((referral, i) => {
                                        return (
                                            <option key={i} value={referral._id}
                                                    data-name={referral.name}
                                                    data-hours={referral.hours}
                                                    data-phone={referral.contactPhone}
                                                    data-email={referral.contactEmail}
                                                    data-requirements={referral.requirements}
                                                    data-url={referral.url}
                                                    data-contact={referral.contactName}
                                                    data-needs={referral.needs}
                                            >
                                                {referral.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <button
                                    disabled={Object.keys(currentReferral).length === 0 || currentReferral.domain !== domain}
                                    className={"text-white px-4 py-2 text-xs rounded mt-3 mb-4 bg-gradient-to-t from-orange-600 to-orange-400 disabled:bg-gradient-to-b disabled:from-gray-300 disabled:to-gray-400"}
                                    onClick={() => {
                                        saveReferral().then(() => {
                                            getUserReferrals()
                                        })
                                        setCurrentReferral({})
                                        document.getElementById(domain).selectedIndex = 0
                                    }}>+ Save
                                </button>
                                <div>
                                    {userReferrals && userReferrals.filter(item => item.domain === domain).map((referral) => {
                                        return (
                                            <UserReferralItem key={referral._id} deleteReferral={deleteReferral}
                                                              getUserReferrals={getUserReferrals} referral={referral}/>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default ReferralSelects;
