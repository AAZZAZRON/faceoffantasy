import React from 'react';
import { useSelector } from 'react-redux';

export default function LeagueSettingsScreen(props) {

    const league = useSelector((state) => state.leagues.currentLeague);
    props.setMessage("Settings for " + league.name);

    const noShow = ["isDrafted", "owner", "users", "teams"];

    return (
        <div>
            League settings are currently unchangeable.
            
            {
                Object.keys(league).map((key) => {
                    if (noShow.includes(key)) return null;
                    return <div>{key}: {league[key]}</div>
                })
            }
        </div>

    )
}
