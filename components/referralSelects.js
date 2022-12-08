import {labelMap} from "../lib/serviceLabelsMap";
import UserReferralItem from "./userReferralItem";
import ReferralSelectsSelect from "./referralSelectsSelect";
import CustomReferralForm from "./customReferralForm";
import {useEffect} from "react";

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
        console.log("getUserReferrals")
        const id = clientId === undefined ? user.email : clientId
        const referrals = await fetch("/api/get-referrals?userId=" + id)
            .then(res => res.json())
        await setUserReferrals(referrals)
    }

    useEffect(() => {
        getUserReferrals().then()
    }, [])

    return (<div className={"flex-1"}>
            {domains.map((domain, i) => {
                return (<div key={i} className={" my-4 border-b-2 pb-4"}>
                        <div className={"text-sm mb-2"}>
                            <span className={"text-gray-500"}>Life Area:</span>
                            <p className={"text-orange-600 text-lg"}>{labelMap[domain]}</p>
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
                                        return (<UserReferralItem key={referral._id}
                                                                  getUserReferrals={getUserReferrals}
                                                                  referral={referral}/>)
                                    })}
                                </div>
                            </div>
                        </div>
                        <CustomReferralForm setUserReferrals={setUserReferrals}
                                            domain={domain}
                                            currentReferral={currentReferral}
                                            user={user}
                                            setCurrentReferral={setCurrentReferral}
                                            userReferrals={userReferrals}
                                            clientId={clientId}
                                            referrals={referrals}
                                            router={router}
                                            getUserReferrals={getUserReferrals}/>
                    </div>)
            })}
        </div>);
}

export default ReferralSelects;
