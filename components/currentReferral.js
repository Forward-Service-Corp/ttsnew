import {HandPalm} from "phosphor-react";

function CurrentReferral({currentReferral}) {
    if(Object.keys(currentReferral).length === 0){
        return (
            <div className={"flex-1 mr-10 shadow rounded overflow-hidden"}>
                <div className={"bg-gray-700 text-white p-3"}>Selected referral details:</div>
                <div className={"flex flex-col align-middle items-center justify-around mt-3"}>

                    <div className={"p-4 text-sm"}>Please make a selection from one of the drop down menus to see details.</div>
                </div>
            </div>
        )
    }
    return (
        <div className={"flex-1 mr-10 shadow rounded overflow-hidden"}>
            <div className={"bg-gray-700 text-white p-3 text-sm"}>Selected referral details:</div>

            <div className={"p-8"}>
                {currentReferral.name !== undefined ? (
                <div>
                    <p className={"text-xs text-gray-500 mt-3"}>Name</p>
                    <p className={"text-sm"}>{currentReferral.name}</p>
                </div>
            ) : null}

                {currentReferral.phone !== undefined ? (
                    <div>
                        <p className={"text-xs text-gray-500 mt-3"}>Phone</p>
                        <p className={"text-sm"}>{currentReferral.phone}</p>
                    </div>
                ) : null}

                {currentReferral.email !== undefined ? (
                    <div>
                        <p className={"text-xs text-gray-500 mt-3"}>Email</p>
                        <p className={"text-sm"}>{currentReferral.email}</p>
                    </div>
                ) : null}

                {currentReferral.hours !== undefined ? (
                    <div>
                        <p className={"text-xs text-gray-500 mt-3"}>Hours</p>
                        <p className={"text-sm"}>{currentReferral.hours}</p>
                    </div>
                ) : null}

                {currentReferral.url !== undefined ? (
                    <div>
                        <p className={"text-xs text-gray-500 mt-3"}>Website</p>
                        <p className={"text-sm truncate"}>{currentReferral.url}</p>
                    </div>
                ) : null}

                {currentReferral.contact !== undefined ? (
                    <div>
                        <p className={"text-xs text-gray-500 mt-3"}>Contact person</p>
                        <p className={"text-sm"}>{currentReferral.contact}</p>
                    </div>
                ) : null}

                {currentReferral.requirements !== undefined ? (
                    <div>
                        <p className={"text-xs text-gray-500 mt-3"}>Requirements</p>
                        <p className={"text-sm"}>{currentReferral.requirements}</p>
                    </div>
                ) : null}

                {currentReferral.needs !== undefined ? (
                    <div>
                        <p className={"text-xs text-gray-500 mt-3"}>Need to bring</p>
                        <p className={"text-sm"}>{currentReferral.needs}</p>
                    </div>
                ) : null}</div>

        </div>
    );
}

export default CurrentReferral;
