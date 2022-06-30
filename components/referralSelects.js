import {labelMap} from "../lib/serviceLabelsMap";
import UserReferralItem from "./userReferralItem";
import ReferralSelectsSelect from "./referralSelectsSelect";

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
        await setUserReferrals(referrals)
    }

    async function deleteReferral(id) {
        await fetch("/api/delete-referral?referralId=" + id)
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
                               <ReferralSelectsSelect
                                   referrals={referrals}
                                   setCurrentReferral={setCurrentReferral}
                                   domain={domain}
                                   currentReferral={currentReferral}
                                   setUserReferrals={setUserReferrals}
                                   userReferrals={userReferrals}
                                   user={user}
                                   router={router}
                                   clientId={clientId}/>

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
