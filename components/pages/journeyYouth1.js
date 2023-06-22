import React from 'react';

function JourneyYouth1(props) {
    return (
        <div className={"text-sm p-4"}>
            <h1 className={"mt-3 text-center text-2xl font-bold"}>So You&apos;ve Hit A Roadblock: What Now?</h1>
            <h2 className={"mt-3 text-center text-lg font-bold"}>“I&apos;ve failed over and over again in my life and
                that is
                why I succeed.”</h2>
            <p className={'mt-[-4px] italic text-center'}>-Michael Jordan, 7-time NBA Champion</p>
            <div className={"flex mt-10"}>
                <div className={"w-1/3"}>
                    <img src="./img/construction-guy.jpg" alt=""/>
                </div>
                <div className={"w-2/3 pl-10"}>
                    <p>Even when you know your dreams and you&apos;ve got a plan, things can (and probably will) happen.
                        There are
                        obstacles outside your control, changes you didn&apos;t expect, and people who could be more
                        helpful. Don&apos;t
                        get discouraged!</p>
                    <p>If the usual road is closed, do you turn around and go home? Give up and do without? Of course
                        not!
                        Instead, you may need to re-route, find another path, get help. Here&apos;s a list of tips to
                        consider when
                        you encounter a roadblock to your dream.</p>
                </div>
            </div>


            <p className={"text-lg font-bold mt-10 mb-4"}>Tips for Success</p>
            <ul className={"list-disc ml-4"}>
                <li>Appreciate what you have today.</li>
                <li>Post inspiring quotes and images to remind you of your dream. Hope is fuel.
                </li>
                <li>Find ways to give back when you can: Volunteering and helping others gives hope, energy and
                    opportunity.
                </li>
                <li>Build your &quot;Dream Team.&quot; Surround yourself with people who support your dream. Ask for
                    help, support, advice, and direction from family, friends, teachers.
                </li>
                <li>Learn how to use the internet to identify resources.
                </li>
                <li>Keep good notes.</li>
                <li>Continue to gain support from your Coach, Mentors and inspirational stories of those you admire.</li>
            </ul>
            <h2 className={"mt-10 text-center text-lg font-bold"}>&quot;The road to success is always under construction.&quot;</h2>
            <p className={'mt-[-4px] italic text-center'}>-Lily Tomlin, American actress and comedian</p>
        </div>
    );
}

export default JourneyYouth1;
