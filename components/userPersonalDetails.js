import React from 'react';

function UserPersonalDetails({viewingUser, role}) {
    return (
        <div className={"bg-gray-100 p-6 mb-5 rounded"}>
            <h2 className={"uppercase text-gray-500 mb-3"}>Personal Details</h2>
            <div className={"flex"}>
                <div className={"flex-1"}>
                    <div>
                        <p className={"text-gray-500 text-xs"}>Name</p>
                        <p>{viewingUser.name}</p>
                    </div>
                    <p className={"text-gray-500 text-xs"}>Email</p>
                    <p>{viewingUser.email}</p>
                    <p className={"text-gray-500 text-xs mt-4"}>Phone</p>
                    <p>{viewingUser.phone}</p>
                    <p className={"text-gray-500 text-xs mt-4"}>User ID</p>
                    <p>{viewingUser._id}</p>
                    <p className={"text-gray-500 text-xs mt-4"}>County</p>
                    <ul>
                        {viewingUser.county && viewingUser.county.map(county => (
                            <li key={county}>{county}</li>
                        ))}
                    </ul>
                </div>
                <div className={"flex-1"}>
                    <p className={"text-gray-500 text-xs"}>Address</p>
                    <p>{viewingUser.street}</p>
                    <p className={"text-gray-500 text-xs mt-4"}>City</p>
                    <p>{viewingUser.city}</p>
                    <p className={"text-gray-500 text-xs mt-4"}>State</p>
                    <p>{viewingUser.state}</p>
                    <p className={"text-gray-500 text-xs mt-4"}>Programs</p>
                    <ul>
                        {viewingUser.programs && viewingUser.programs.map((program, i) => (
                            <li key={i}>{program}</li>
                        ))}
                    </ul>
                    <p className={"text-gray-500 text-xs mt-4"}>User Type</p>
                    <p>{role}</p>
                </div>
            </div>
        </div>
    );
}

export default UserPersonalDetails;
