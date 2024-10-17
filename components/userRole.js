import React from 'react';
import AssignedClient from "./assignedClient";

function UserRole({updateRoleInformation, terminationPattern, role, viewingUser, viewingUserClients}) {

    const [currentClients, setCurrentClients] = React.useState(viewingUserClients || []);

    return (
        <div className={"bg-gray-100 p-6 mb-5 rounded"}>
            <div className={"flex justify-between items-center border-0 border-b py-2 mb-4"}>
                <div>
                    <h2 className={"uppercase text-gray-500"}>Role Assignment</h2>
                </div>
                <button
                    className={`${role === "coach" ? 'visible' : 'hidden'} text-xs rounded-full text-white px-4 py-2 bg-red-500`}
                    onClick={terminationPattern}>X Terminate coach</button>
            </div>
            <div className={`grid grid-cols-4 gap-4`}>
                <div className={`${role === 'client' ? ' bg-indigo-300 border border-indigo-700 font-bold' : ' bg-indigo-100 shadow cursor-pointer'} text-xs px-4 py-2 text-center rounded-full`} onClick={() => updateRoleInformation('client')}>Client</div>
                <div className={`${role === 'coach' ? ' bg-green-300 border border-green-700 font-bold' : ' bg-green-100 shadow cursor-pointer'} text-xs px-4 py-2 text-center rounded-full`} onClick={() => updateRoleInformation('coach')}>Coach</div>
                <div className={`${role === 'admin' ? ' bg-amber-300 border border-amber-700 font-bold' : ' bg-amber-100 shadow cursor-pointer'} text-xs px-4 py-2 text-center rounded-full`} onClick={() => updateRoleInformation('admin')}>Admin</div>
                <div className={`${role === 'terminated coach' ? ' bg-red-300 border border-red-700 font-bold' : ' bg-red-100 shadow cursor-pointer'} text-xs px-4 py-2 text-center rounded-full`} onClick={() => updateRoleInformation('terminated coach')}>Terminated Coach</div>
            </div>
            <div className={`${role === 'coach' ? 'visible' : 'hidden'}`}>
                <div className={"flex justify-between items-center border-0 border-y py-2 mb-4 mt-8"}>
                    <div>
                        <h2 className={"uppercase text-gray-500"}>Current Clients</h2>
                    </div>
                </div>
                <div  className={`grid grid-cols-4 gap-4`}>
                    {currentClients && currentClients.map((client) => (
                    <AssignedClient key={client._id} client={client} role={role} viewingUser={viewingUser} setCurrentClients={setCurrentClients} />
                ))}
                </div>
            </div>
        </div>
    );
}

export default UserRole;
