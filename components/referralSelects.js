import React, {useState} from 'react';
import {labelMap} from "../lib/serviceLabelsMap";

function ReferralSelects({domains, setCurrentReferral, currentReferral, data, user, router, referrals}) {

    const [userReferrals, setUserReferrals] = useState(referrals)

    async function getUserReferrals() {
        const userReferrals = await fetch("/api/get-referrals?userId=" + user.email + "&surveyId=" + router.query.surveyId)
            .then(res => res.json())
        await setUserReferrals(userReferrals)
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
                userId: user.email,
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
                            className={"text-indigo-600 text-lg"}>{labelMap[domain]}</p>
                        </div>

                        <div className={"flex"}>
                            <div className={"w-full"}>
                                <select className={"w-full"} onChange={(e) => {
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
                                    <option value={""}></option>
                                    {data.referrals && data.referrals.filter(item => item.service === domain).map((referral, i) => {
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
                                    className={"bg-indigo-600 text-white px-4 py-2 text-xs rounded mt-3 mb-4 disabled:bg-gray-400"}
                                    onClick={() => {
                                        saveReferral(domain)
                                            .then(() => {
                                                getUserReferrals().then(() => {
                                                    setCurrentReferral({})
                                                })
                                            })
                                    }}>+ Save
                                </button>
                                <div>
                                    {userReferrals && userReferrals.filter(item => item.domain === domain).map((referral, i) => {
                                        return (
                                            <div key={i}><span
                                                className={"text-sm"}>{referral.name}</span> - <span
                                                className={"text-xs underline text-red-600 cursor-pointer"}
                                                onClick={() => {
                                                    deleteReferral(referral._id)
                                                        .then(() => getUserReferrals())
                                                }}>delete</span>
                                            </div>
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
