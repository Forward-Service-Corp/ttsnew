import React from 'react';
import Image from "next/image";

function JourneyYouth2() {
    return (
        <div  className={"text-sm p-4 dark:text-white"}>
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
            <p className={"my-4"}>May your journey always continue...</p>
            <div className={"p-10 relative w-[100%] h-[650px] block"}>
                <Image src="/img/ben-franklin.jpg" alt="Energy and persistence conquer all things." sizes="(max-width: 300px) 20vw, (max-width: 300px) 20vw, 18vw" fill/>
            </div>
        </div>
    );
}

export default JourneyYouth2;
