import Image from "next/image";

function Welcome1() {
    return (
        <div className={"font-light"}>
            <div className={" bg-gray-100 p-4 dark:p-0 dark:bg-opacity-0 dark:text-white"}>
                <h1 className={"text-3xl text-orange-600 dark:text-orange-400"}>Welcome to Transition To Success and Map of My Dreams</h1>
                <h2 className={"my-5 font-bold text-orange-600 dark:text-orange-400"}> Your Journey Begins Here</h2>
                <p className={"text-sm"}>
                    Welcome to Transition To Success&reg; (TTS). This TTS Workbook and Guide is designed specifically
                    for YOU. Together with your Transition To Success (TTS) Coach, you will map your journey to your
                    dreams
                    and work together to make those dreams come true. Just like taking a trip, know where you are going
                    to
                    make sure you get there. Go after what you want. Make your dreams become reality. Mapping Dreams is
                    for
                    everyone, regardless of your age, race, religion, male or female, rich or poor. All of us have
                    dreams.
                </p>

                <h2 className={"my-5 font-bold text-orange-600 dark:text-orange-400"}>How do I make my dreams come true?</h2>
                <p className={"text-sm"}>
                    Just ask anyone, &quot;What&apos;s your dream?&quot;. You will find there are as many dreams as
                    there are people. Having dreams is the easy part. Making your dreams come true is the tough part and
                    requires so much more than just wishing. Making dreams come true requires hope, plans, the ability
                    to ask for help, determination, and money. Making a real plan, designed by you, that will work for
                    you, is the
                    path to your success.
                </p>

                <p className={"text-sm"}>
                    Each step you take brings you one step closer to your dream. Each step is a reason to celebrate.
                    And, when &quot;life happens&quot; and a step suddenly turns into a slip or a fall, YOU start again.
                    Just
                    like a wrong turn on a map, the key is to reroute. DO NOT STOP. Do not turn around. Keep moving.
                    Everyone has missteps, even when moving in the right direction. What really matters is what you do
                    next.
                </p>
            </div>

            <div className="container mx-auto my-6 p-6 border-2 rounded-xl border-indigo-100 shadow-xl">
                <div className="flex flex-col lg:flex-row items-center lg:items-start">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                        <div className="relative w-full h-0 pb-[100%] lg:pb-[calc(100%)]">
                            <Image
                                src="/img/birds-road.png"
                                alt="Descriptive alt text"
                                fill={true}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                    {/* Text Section */}
                    <div className="w-full lg:w-2/3 lg:pl-8">
                        <h2 className="text-2xl font-bold mb-4">If at first you don&apos;t succeed try and try
                            again.</h2>
                        <div className="text-lg text-gray-700">
                            <p className={"font-bold  my-3"}>Did you know –</p>
                            <ul className={"list-disc px-5"}>
                                <li>Michael Jordan did not make the cut for his high school basketball team.</li>
                                <li>Thomas Edison had over 1000 failed attempts at a light bulb.</li>
                                <li>Oprah was told she didn&apos;t have a &quot;face&quot; for television.</li>
                                <li>Dr. Seuss&apos; 1st book was rejected 27 times before it was finally published.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={" bg-gray-100 p-4"}>
                <p className={"text-sm"}>
                From now on giving up is not an option. To be the best you, you must embrace the missteps, learn
                from your mistakes, and re-route. Keep moving, and YOU will get to your destination.
            </p>
            </div>
        </div>
    );
}

export default Welcome1;
