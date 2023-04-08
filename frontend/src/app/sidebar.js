import "../css/nav.css";
import logo from "../images/logo.jpg";
import "../css/sidebar.css";
import {HomeRounded, EmojiEventsRounded, SportsHockeyRounded, SettingsRounded, SwapHorizRounded} from "@mui/icons-material";

// the side button/links
function Button(props){
    const icon = props.icon;
    const text = props.text;
    const selected = props.selected;
    const to = selected ? "" : props.to;
    return(
        <div className={"sectionButton d-flex" + (selected ? " selected" : " link-change")}>
            <div className="col-1 text-left"><span className="align-middle">{icon}</span></div>
            <a className="buttonText" href={to}>{text}</a>
        </div>
    )
}

// the left sidebar
export default function Sidebar(props){
    const selected = props.selected;
    return (
        <div className="leftBar">
            <div className="logo nav-height"><img src={logo} alt="logo" id="logo"></img></div>
            <div className="actions">
                <p className="actionLabel">Actions</p>
                <div className="buttons">
                <Button icon={<HomeRounded color="action" fontSize="small"></HomeRounded>} text="Home" selected={selected === "Home"} to="/lyonhacks3"></Button>
                <Button icon={<EmojiEventsRounded color="action" fontSize="small"></EmojiEventsRounded>} text="League Standings" 
                        selected={selected === "League"} to="/lyonhacks3/league"></Button>
                <Button icon={<SportsHockeyRounded color="action" fontSize="small"></SportsHockeyRounded>} text="Players" 
                        selected={selected === "Players"} to="/lyonhacks3/players"></Button>
                <Button icon={<SettingsRounded color="action" fontSize="small"></SettingsRounded>} text="League Owner Only League Settings" 
                        selected={selected === "Settings"} to="/lyonhacks3/settings"></Button>
                <Button icon={<SwapHorizRounded color="action" fontSize="small"></SwapHorizRounded>} text="Switch Leagues" 
                        selected={selected === "Switch"} to="/lyonhacks3/switch"></Button>
                </div>
            </div>
        </div>
    )
}