import "../css/nav.css";
import logo from "../images/logo.jpg";
import "../css/sidebar.css";
import {HomeRounded, EmojiEventsRounded, SportsHockeyRounded, SettingsRounded, SwapHorizRounded} from "@mui/icons-material";

// the side button/links
function Button(props){
    const icon = props.icon;
    const text = props.text;
    const selected = props.selected;
    return(
        <div className={"sectionButton row" + (selected ? " selected" : "")}>
            <div className="col-1"><span className="align-middle">{icon}</span></div>
            <span className="buttonText col-10">{text}</span>
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
                <Button icon={<HomeRounded color="action" fontSize="small"></HomeRounded>} text="Home" selected={selected === "Home"}></Button>
                <Button icon={<EmojiEventsRounded color="action" fontSize="small"></EmojiEventsRounded>} text="League Standings" selected={selected === "Home"}></Button>
                <Button icon={<SportsHockeyRounded color="action" fontSize="small"></SportsHockeyRounded>} text="Players" selected={selected === "Home"}></Button>
                <Button icon={<SettingsRounded color="action" fontSize="small"></SettingsRounded>} text="League Owner Only League Settings" selected={selected === "Home"}></Button>
                <Button icon={<SwapHorizRounded color="action" fontSize="small"></SwapHorizRounded>} text="Switch Leagues" selected={selected === "Home"}></Button>
                </div>
            </div>
        </div>
    )
}