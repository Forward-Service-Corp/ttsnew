import {Trash} from "phosphor-react";


function UserReferralItem({referral, deleteReferral, getUserReferrals}) {
    return (
        <div className={"flex items-center justify-between bg-gray-100 px-2 py-1 hover:bg-gray-200"}>
            <div className={"flex-1 text-sm"}>{referral.name}</div>
            <div onClick={() => {
                if(confirm(`Are you sure you want to delete ${referral.name}? This action is permanent.`)){
                    deleteReferral(referral._id)
                        .then(() => getUserReferrals())
                }

            }}>
                <Trash size={20} weight={"thin"} color={"red"}/>
            </div>

        </div>
    );
}

export default UserReferralItem;
