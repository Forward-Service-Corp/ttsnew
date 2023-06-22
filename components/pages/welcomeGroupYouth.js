import React from 'react';
import WelcomeYouth1 from "./welcomeYouth1";
import WelcomeYouth2 from "./welcomeYouth2";
import WelcomeYouth3 from "./welcomeYouth3";

function WelcomeGroupYouth({currentTab}) {
    return (
        <div>
            <div className={currentTab === 1 ? "visible" : "hidden"}>
                <WelcomeYouth1/>
            </div>
            <div className={currentTab === 2 ? "visible" : "hidden"}>
                <WelcomeYouth2/>
            </div>
            <div className={currentTab === 3 ? "visible" : "hidden"}>
                <WelcomeYouth3/>
            </div>
        </div>
    );
}

export default WelcomeGroupYouth;
