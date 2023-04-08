import React from 'react';

export default function LeagueScreen (props) {
    const message = "Standings for <League Name>";
    props.handleCallback(message);
    return (
        <>
        <div>League Screen</div>
        </>
    );
}
