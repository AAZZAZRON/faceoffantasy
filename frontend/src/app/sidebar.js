import "../css/nav.css";
import "../css/sidebar.css";


function Button(props){
    const image = props.image;
    const text = props.text;
    const selected = props.selected
    return(
        <div className={"sectionButton row" + (selected ? " selected" : "")}>
            <img className="buttonIcon col-1" src={image} alt="icon"></img>
            <p className="buttonText col-8">{text}</p>
        </div>
    )
}

export default function Sidebar(props){
    const selected = props.selected;
    return (
        <div className="leftBar col-3">
            <div className="logo nav-height">Logo</div>
            <div className="actions">
                <p className="">Actions</p>
                <Button image="" text="Home" selected={selected === "Home"}></Button>
                <Button image="" text="League Standings" selected={selected === "Home"}></Button>
                <Button image="" text="Players" selected={selected === "Home"}></Button>
                <Button image="" text="League Owner Only League Settings" selected={selected === "Home"}></Button>
                <Button image="" text="Switch Leagues" selected={selected === "Home"}></Button>
            </div>
        </div>
    )
}