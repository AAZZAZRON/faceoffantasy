import "../../css/playersScreen.css";

export default function PlayersScreen (props) {
    const message = "Players on <Team Name>";
    props.handleCallback(message);
    return (
        <>
        <div>playerScreen</div>
        </>
    );
}
