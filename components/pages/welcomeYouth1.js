import Image from "next/image";

function WelcomeYouth1() {
    return (
        <div className={"font-light dark:text-white"}>
            <div className={"p-4"}>
                <h1 className={"text-3xl text-orange-600 pb-4"}>Welcome to Transition To Success&reg; Youth Map of My Dreams&reg;</h1>
                <div className={'flex'}>
                    <div className={'w-1/2 mr-8'}>
                        <ul className={'list-disc pl-8'}>
                            <li>Think about the life you want.</li>
                            <li>What are your dreams?</li>
                            <li>What are your goals?</li>
                        </ul>
                        <p>
                            Use this <strong>Map of My Dreams&reg; Workbook to plan the future you want. Your Transition to Success&reg; coach can help.</strong>
                        </p>
                    </div>
                    <div className={'w-1/2 relative inline h-[300px]'}>
                        <Image src={'/img/pirate-map.jpg'} alt={'Image of a treasure map'} sizes="(max-width: 300px) 20vw, (max-width: 300px) 20vw, 18vw" fill/>
                    </div>
                </div>
                <h2 className={"my-5 font-bold text-orange-600"}> Make your dreams come true.</h2>
                <p className={"text-sm"}>
                    Think about the life you want. Having a dream is the easy part; making them come true requires hope,
                    a plan, determination, and asking for help when you need it. Make your own plan, one that will work
                    for you. Expect challenges, learn from mistakes, reroute when needed.
                </p>

                <p className={"text-md font-bold"}>
                    Did you know;
                </p>

                <ul className={'list-disc pl-8'}>
                    <li>Oprah Winfrey was told she didn&apos;t have a &quot;face&quot; for television.</li>
                    <li>Akio Morita (co-founder of Sony) almost flunked out of high school and went bankrupt multiple
                        times before launching PlayStation.</li>
                    <li>Michael Jordan did not make the cut for his high school basketball team.</li>
                    <li>JK Rowling (author of Harry Potter) was rejected by every major book company before being published.</li>
                </ul>
            </div>

            <div className={'text-lg font-bold'}>
                Keep Moving,
            </div>
            <div className={'text-lg font-bold pl-12'}>
                Learn From Mistakes,
            </div>
            <div className={'text-lg font-bold pl-24'}>
                Ask For Help,
            </div>
            <div className={'text-lg font-bold pl-36'}>
                Don&apos;t Give Up,
            </div>
            <div className={'text-lg font-bold pl-48'}>
                You Can Get To Your Destination!
            </div>

        </div>
    );
}

export default WelcomeYouth1;
