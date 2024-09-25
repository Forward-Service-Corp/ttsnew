import React from 'react';

function JourneyQuote({quote, author}) {
    return (
        <div className={"text-sm p-10 bg-blue-400 text-white mt-4 shadow font-extralight"}>
            <h2 className={"text-center text-4xl"}>&quot;{quote}&quot;<span
                className={'text-sm ml-2'}>{author}</span></h2>
        </div>
    );
}

export default JourneyQuote;
