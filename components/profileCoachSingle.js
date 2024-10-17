import React from 'react';

function ProfileCoachSingle({coach}) {
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(prevOpen => !prevOpen);
    }
    return (
        <div className={`${open ? 'border border-green-700 rounded-2xl' : null}`}>
            <div onClick={handleClick} className={`${open ? 'rounded-t-2xl bg-green-300 font-bold' : 'rounded-full bg-green-100 shadow'} text-xs  text-black px-4 py-2 flex justify-between cursor-pointer`}>
                <div>{coach.name !== '' ? coach.name : coach.email}</div>
                <div>{open ? '-' : '+'}</div>
            </div>
            <div className={`${open ? 'visible' : 'hidden'} bg-white text-xs p-4 rounded-b-2xl`}>
                <div className={`mb-2`}>{coach.phone ?
                    <span><span className={`text-gray-500`}>Phone:</span> {coach.phone}</span> :
                    <span><span className={`text-gray-500`}>Phone:</span> No phone</span>}</div>
                <div>{coach.email ? <span><span className={`text-gray-500`}>Email:</span> {coach.email}</span> : null }</div>
            </div>
        </div>
    );
}

export default ProfileCoachSingle;
