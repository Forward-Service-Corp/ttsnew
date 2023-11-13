
function DreamIntro() {
    return (
        <div className={" bg-gray-100 p-4 dark:p-0 dark:bg-opacity-0 dark:text-white"}>
            <div>
                <h1 className={"text-2xl text-orange-600 uppercase font-light dark:text-orange-400 dark:text-lg"}>My Dreams Today</h1>
                <p className={"text-sm"}>This is your Map of your Dreams. As you take the time to think about your
                    dreams and hopes let your heart speak to you. </p>

                <p><strong>Believe in what could be</strong>. Dreams can be about:</p>
                <ul className={'ml-8 list-disc'}>
                    <li>Buying a car</li>
                    <li>Going to college</li>
                    <li>Relationships you hope to have</li>
                    <li>Finding a job</li>
                </ul>

                <p>For every dream ask:</p>
                <ul className={'ml-8 list-disc'}>
                    <li>&quot;What do I need to do?&quot;</li>
                    <li>&quot;Who can help me?&quot;</li>
                </ul>

                <p>For example, if you want to buy a car, you&apos;ll probably need to:</p>
                <ul className={'ml-8 list-disc'}>
                    <li>Get a driver&apos;s license</li>
                    <li>Make a budget, include car insurance</li>
                    <li>Find someone to help find the best car for you</li>
                    <li>Get a part time job/save money</li>
                </ul>

                <p>You have choices!</p>

                <p><strong>&quot;You&apos;re braver than you believe, stronger than you seem, and smarter than you think.&quot;</strong> A.A.Milne, English author of Winnie the Pooh</p>
            </div>


        </div>
    );
}

export default DreamIntro;
