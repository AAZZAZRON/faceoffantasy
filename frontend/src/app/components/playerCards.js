export function HeadShot({player, setModal, position, team, owner, avatar}) {
    return (
    <div className="card-header" onClick={() => {
        setModal(player, position, team, owner);
    }}>
        <img src={player.avatar} alt="headshot" className="headshot"/>
        <div>
            <div className="name">{player.firstName} {player.lastName}</div>
            <div className="card-header-bottom">
                <div className="team">{team.abbreviation}</div>
                <div className="position">{position.abbreviation}</div>
                <div className="roster-status">{rosterStatus(player)}</div>
            </div>
        </div>
    </div>
    );
}

export function SkaterCard(props) {
    const skater = props.skater;
    // TODO: abbr instead of teamName
    return (
        <div className="card" style={{flexDirection: 'row'}}>
            <HeadShot setModal={props.setModal} player={skater} position={props.position} team={props.team} owner={props.owner}></HeadShot>
            <div className="card-body">
                <div style={{width: '45px', overflow: 'clip'}}>{props.owner.abbreviation}</div>
                <div>{skater.games}</div>
                <div>{skater.goals}</div>
                <div>{skater.assists}</div>
                <div>{skater.pim}</div>
                <div>{skater.powerPlayPoints}</div>
                <div>{skater.shortHandedGoals}</div>
                <div>{skater.shots}</div>
                <div>{skater.hits}</div>
                <div>{skater.blocked}</div>
                <div>{skater.fantasyPoints}</div>
                <div>{skater.avgFantasyPoints}</div>
            </div>
        </div>
    )
}

export function GoalieCard(props) {
    const goalie = props.goalie;
    return (
        <div class="card" style={{flexDirection: 'row'}}>
            <HeadShot setModal={props.setModal} player={goalie} position={props.position} team={props.team} owner={props.owner}></HeadShot>
            <div class="card-body">
                <div style={{width: '45px', overflow: 'clip'}}>{props.owner.abbreviation}</div>
                <div>{goalie.gamesStarted}</div>
                <div>{goalie.wins}</div>
                <div>{goalie.goalsAgainst}</div>
                <div>{(Math.round(goalie.goalAgainstAverage * 100) / 100).toFixed(2)}</div>
                <div>{goalie.saves}</div>
                <div>{goalie.shutouts}</div>
                <div>{goalie.ot}</div>
                <div>{(Math.round(goalie.savePercentage * 1000) / 1000).toFixed(3)}</div>
                <div>{goalie.fantasyPoints}</div>
                <div>{goalie.avgFantasyPoints}</div>
            </div>
        </div>
    )
}

const rosterStatus = (player) => {
    if (player.rosterStatus === 'Y') return '';
    if (player.rosterStatus === 'I') return 'IR';
    alert(player.firstName + ' ' + player.lastName + ' ' + player.rosterStatus);
    return 'Unknown';
}
