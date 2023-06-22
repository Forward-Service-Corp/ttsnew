function WelcomeYouth2() {
    return (
        <div className={"font-light"}>
            <div className={"p-4"}>
                <div className={'text-center'}>
                    <h1 className={"text-3xl text-orange-600"}>&quot;Vision Without Action Is Just A Daydream&quot;</h1>
                    <p>-Japanese proverb</p>
                </div>
                <p className={'mt-10'}><strong>What&apos;s the difference between a dream and a daydream?</strong> A
                    daydream is a fantasy,
                    without need or concern for reality. Wishes alone won&apos;t make your dreams come true. Dreams come
                    true because you work hard for them.</p>

                <div className={'flex mt-10'}>
                    <div className={'w-1/3 mr-10'}>
                        <img src={'/img/surround-yourself.jpg'}
                             alt={'Surround yourself with people image'}/></div>
                    <div className={'w-2/3'}>
                        <p>You can probably already think of friends, teachers or family members who support your goals.
                            Now, your TTS Coach is ready to come alongside and help you create a Map that will guide
                            your journey toward your dreams.</p>
                        <p>As you develop your Map, you’ll plot the steps toward your dream and find the resources you
                            need to make it a reality. Your Coach will connect you to the supports you need, and help
                            you tackle challenges along the way.</p>
                    </div>
                </div>
                <p>Know where you’re headed, figure out what you need and who can help you. As you lead your life be
                    bold, learn from mistakes and know that a dream grounded in real action can come true.</p>
            </div>


        </div>
    );
}

export default WelcomeYouth2;
