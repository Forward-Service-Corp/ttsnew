import React from 'react';

function ReferralSelectsButton({
                                   userReferrals,
                                   currentReferral,
                                   domain,
                                   setCurrentReferral,
                                   router,
                                   clientId,
                                   setUserReferrals,
                                   user,
                                   visible,
                                   setSaving
                               }) {

    async function saveReferral() {
        await setSaving(domain)
        await fetch("/api/save-referral", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                dreamId: router.query.dreamId,
                surveyId: router.query.surveyId,
                userId: clientId === undefined ? user._id : clientId,
                dream: router.query.dream,
                domain: currentReferral.domain,
                name: currentReferral.name,
                phone: currentReferral.phone,
                hours: currentReferral.hours,
                requirements: currentReferral.requirements,
                url: currentReferral.url,
                contact: currentReferral.contactName,
                contactPhone: currentReferral.contactPhone,
                contactEmail: currentReferral.contactEmail,
                needs: currentReferral.needs
            })
        }).then(res => res.json())
            .then()
    }

    async function getUserReferrals() {
        const id = clientId === undefined ? user._id : clientId
        await fetch("/api/get-referrals?userId=" + id)
            .then(res => res.json())
            .then(res => { setUserReferrals(res) })
    }


    function checkUserReferrals() {
        return userReferrals.filter(referral => referral.name === currentReferral.name)
    }

    return (
        <button
            disabled={Object.keys(currentReferral).length === 0 || currentReferral.domain !== domain}
            className={`${visible ? "visible" : "hidden"}  my-3 py-2 px-6 text-white text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-800 rounded-lg shadow-xl dark:font-extralight dark:text-white dark:hover:bg-indigo-600`}
            onClick={() => {

                if (checkUserReferrals().length === 0) {
                    // save referral
                    saveReferral().then(() => {
                        getUserReferrals().then(() => {setSaving(false)})
                    })
                    setCurrentReferral({})
                    document.getElementById(domain).selectedIndex = 0
                    // end save referral
                } else {
                    alert("You have already selected this referral. Please choose another referral.")
                    setCurrentReferral({})
                    document.getElementById(domain).selectedIndex = 0
                }

            }}>+ Save
        </button>
    );
}

export default ReferralSelectsButton;
