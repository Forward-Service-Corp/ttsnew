import React from 'react';

function JourneyYouth2(props) {
    return (
        <div  className={"text-sm p-4"}>
            <h1 className={"text-center my-4 text-xl"}>This Is <span className={"underline"}>Your</span> Journey</h1>
            <h2 className={"mt-6 text-center text-lg font-bold"}>&quot;You don’t have to see the whole staircase—
                just take the first step.&quot;</h2>
            <p className={'mt-[-4px] italic text-center'}>-Martin Luther King Jr., American civil rights leader</p>

            <p className={"mb-4"}>Celebrate the small victories!</p>
            <ul className={"list-disc ml-4"}>
                <li>Re-do your <span className={"font-bold"}>Life Area Survey</span></li>
                <li>Any new priorities?</li>
                <li>New dreams?</li>
                <li>Share your story to inspire others.</li>
            </ul>
            <p className={"mt-4"}>May your journey always continue...</p>
            <div className={"p-10"}>
                <img src="./img/ben-franklin.jpg" alt="Energy and persistence conquer all things."/>
            </div>
        </div>
    );
}

export default JourneyYouth2;
