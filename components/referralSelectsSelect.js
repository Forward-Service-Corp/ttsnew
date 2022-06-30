import React from 'react';
import {labelMap} from "../lib/serviceLabelsMap";
import ReferralSelectsButton from "./referralSelectsButton";

function ReferralSelectsSelect({domain, setCurrentReferral, referrals, clientId, currentReferral, user, router, userReferrals, setUserReferrals}) {

    const filteredReferrals = referrals.filter(referral => referral.service === domain)

    return (
        <>
            <select id={domain}
                   className={`w-full text-sm rounded ${filteredReferrals.length > 0 ? "visible" : "hidden"}`}
                   onChange={(e) => {
                       if (e.target.value === "") {
                           setCurrentReferral({})
                       } else {
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
                       }

                   }}>
            <option value={""}>
                Please select a referral for {labelMap[domain]}...
            </option>
            {filteredReferrals.map((referral, i) => {
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
            <ReferralSelectsButton
                visible={filteredReferrals.length > 0}
                setCurrentReferral={setCurrentReferral}
                domain={domain}
                clientId={clientId}
                currentReferral={currentReferral}
                user={user}
                userReferrals={userReferrals}
                setUserReferrals={setUserReferrals}
                router={router}/>
            <span className={`${filteredReferrals.length > 0 ? "hidden" : "visible"}`}>There are no referrals available for your county and life area combination.</span>
        </>
    );
}

export default ReferralSelectsSelect;
