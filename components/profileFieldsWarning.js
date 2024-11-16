import React from 'react';

function ProfileFieldsWarning({name, homeCounty, counties, programs, fieldsWarning}) {
    return (
        <div className={`bg-red-600 text-white p-4 ${fieldsWarning ? 'visible' : 'hidden'}`}>
            Please complete the following required fields and save your profile.
            <ul className={`list-disc ml-6 text-sm font-light`}>
                <li className={`${!name ? 'visible' : 'hidden'}`}>First and Last Name</li>
                <li className={`${!homeCounty ? 'visible' : 'hidden'}`}>County of Residence</li>
                <li className={`${!counties.length ? 'visible' : 'hidden'}`}>Programs</li>
                <li className={`${!programs.length ? 'visible' : 'hidden'}`}>Resource Counties</li>
            </ul>
        </div>
    );
}

export default ProfileFieldsWarning;
