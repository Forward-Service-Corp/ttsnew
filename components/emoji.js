import React from 'react';
const Emoji = props => (
    <div
        className="emoji text-3xl text-center align-middle block"
        role="img"
        aria-label={props.label ? props.label : ""}
        aria-hidden={props.label ? "false" : "true"}
    >
        {props.symbol}
    </div>
);
export default Emoji;
