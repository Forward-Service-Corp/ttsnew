import React from 'react';

function CurrentReferral({currentReferral}) {
    if(Object.keys(currentReferral).length === 0){
        return (
            <div className={"mr-10 flex-initial"}>
                <p>Please make a selection from one of the drop down menus to see details. </p>
            </div>
        )
    }
    return (
        <div className={"flex-1"}>
            <p className={"text-indigo-600"}>Selected referral details:</p>

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
            ) : null}

        </div>
    );
}

export default CurrentReferral;
