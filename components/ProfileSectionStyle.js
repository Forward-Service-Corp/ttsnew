import React from 'react';

function ProfileSectionStyle({children, title, buttonActionTitle, open, setOpen}) {

    return (
        <div className={`p-6 bg-gray-100 shadow-xl mb-6`}>
            <div className={`w-full pb-2 border-b-[1px] border-black mb-4 flex justify-between`}>
                <h2 className={"uppercase text-gray-800 text-2xl font-light dark:text-white"}>{title}</h2>
                <button className={`${open ? 'bg-blue-200 text-black' : 'bg-blue-400 text-white'} rounded py-2 text-center px-4 text-xs`} onClick={() => setOpen(!open)}>
                    {!open ? `${buttonActionTitle} ${title}` : "Collapse Section"}
                </button>
            </div>
            {children}
        </div>
    );
}

export default ProfileSectionStyle;
