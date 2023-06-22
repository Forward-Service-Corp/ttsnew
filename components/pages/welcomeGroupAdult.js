import React from 'react';
import Welcome1 from "./welcome1";
import Welcome2 from "./welcome2";
import Welcome3 from "./welcome3";

function WelcomeGroupAdult({currentTab}) {
    return (
        <div>
            <div className={currentTab === 1 ? "visible" : "hidden"}>
                <Welcome1/>
            </div>
            <div className={currentTab === 2 ? "visible" : "hidden"}>
                <Welcome2/>
            </div>
            <div className={currentTab === 3 ? "visible" : "hidden"}>
                <Welcome3/>
            </div>
        </div>
    );
}

export default WelcomeGroupAdult;
