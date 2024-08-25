import React from 'react';
import JourneyQuote from "../journeyQuote";

function Journey1() {
    return (
        <>
            <div className={"text-sm p-10 bg-gray-100 shadow"}>
                <h1 className={"text-3xl font-bold"}>The Road Is Closed – Dealing with Road Blocks and
                    Detours</h1>
                <p className={'text-xl'}>When traveling, the unexpected should be expected – don’t be discouraged. This
                    is life, be prepared
                    and
                    re-route.</p>
                <p>If you’re going to the store and the usual road is closed, what to you do? Turn around and go home?
                    Give up
                    and do without? Re-route – ask for help, find another path to get where you are going. This is
                    your journey.</p>
            </div>
            <JourneyQuote quote={"If at first you don’t succeed try and try again. "} author={"E. Hickson"}/>
            <div className={"text-sm p-10 bg-gray-100 mt-4"}>
                <h2 className={"text-3xl mb-8 font-bold"}>Map of My Dreams – Tips to Success</h2>
                <ul className={"list-disc mx-8"}>
                    <li>Work with your TTS Coach.</li>
                    <li>CARE: Coordinate All Resources Effectively – get the most out of every program and
                        service you are eligible for. (Your TTS Coach help you find the programs you want.)
                    </li>
                    <li>Learn to make the most of the money you have. This is even more important when
                        money is scarce.
                    </li>
                    <li>Volunteer: Regardless of your age, race, or religion, People who volunteer do better
                        physically, emotionally and economically. Volunteer as a stepping stone to open doors to
                        achieve your dreams. Helping others helps you too!
                    </li>
                    <li>Ask for help – build your dream team. Find family, friends, neighbors, co-workers who
                        have faced similar struggles – ask them for their support, advice and direction. Your dream team
                        supports
                        your transition.
                    </li>
                </ul>
            </div>
            <JourneyQuote quote={"A Problem will get heavier when the only person carrying it is you."}
                          author={"OMGQuotes.com"}/>
            <JourneyQuote quote={"The best advice... never be afraid to ask for help."} author={"Demi Lovato"}/>
            <div className={"text-sm p-10 bg-gray-100 mt-4"}>
                <h2 className={"font-bold text-3xl mb-8"}>More tips for success...</h2>
                <ul className={"list-disc mx-8"}>
                    <li>Place a copy of the “IF” poem and other inspiring messages in the places you will see them. Use
                        them,
                        especially in tough times.
                    </li>
                    <li>Use the stories of others overcoming challenges as your inspiration, especially during difficult
                        times.
                    </li>
                    <li>Life is a rocky road – expect road blocks and re-route.</li>
                </ul>
            </div>
            <JourneyQuote
                quote={"There is no shame in asking for help, it is one of the most courageous things you will ever do..."}
                author={"Laura Lane"}/>
            <JourneyQuote quote={"The only mistake you can make is not asking for help."} author={"Sandeep Jauhar"}/>
        </>
    );
}

export default Journey1;
