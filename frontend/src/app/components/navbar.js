import "../../css/navbar.css";
// the top navbar {message=the message to display at the top}
export default function Navbar(props){

    return(
        <div className="navbar-container">
            <h1 style={{marginTop: "1%", marginBottom: "1%"}}>{props.message}</h1>
            <div>Profile</div>
        </div>
    )   
}
