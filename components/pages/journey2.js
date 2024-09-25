import React from 'react';
import JourneyQuote from "../journeyQuote";

function Journey2(props) {
    return (
        <>
            <div className={"text-sm p-10 bg-gray-100"}>
                <h1 className={"text-center my-4 text-3xl"}>THE JOURNEY</h1>
                <p>As you reach each destination on your journey remember to go back to your Map. Check off each
                    destination
                    you reach.. Enjoy and share the feeling of accomplishment and gratitude, especially with those that
                    helped
                    you along the way. Re-score your Life Area Survey. Have your scores improved? Are there new
                    priorities,
                    new
                    destinations, side trips, and new dreams? Share your story, inspire hope and do help others with
                    their
                    dreams.</p>
                <p>Let your journey always continue.</p>
                <p>Keep us posted... introduce yourself and share your journey with Dr. Wilson at <a
                    className={"underline text-orange-500"}
                    href={"mailto:MWilson@tts-llc.org"}>MWilson@tts-llc.org</a></p>
            </div>
            <JourneyQuote quote={"Difficult roads often lead to beautiful destinations."} author={""}/>
        </>
    );
}

export default Journey2;
