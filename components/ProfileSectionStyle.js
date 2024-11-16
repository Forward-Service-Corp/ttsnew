import React from 'react';

function ProfileSectionStyle({children, title}) {
    return (
        <div className={`p-6 bg-gray-100 shadow-xl mb-6`}>
            <div className={`w-full pb-2 border-b-[1px] border-amber-600 mb-4`}>
                <h2 className={"uppercase text-gray-800 text-2xl font-light dark:text-white"}>{title}</h2>
            </div>
            {children}
        </div>
    );
}

export default ProfileSectionStyle;
