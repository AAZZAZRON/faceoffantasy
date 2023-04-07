import { useState } from "react";
import "../css/nav.css";

// the search bar {onSearch(text) called when enter is pressed, placeholder string}
const Searchbar = ({onSearch, placeholder}) => {
    const [curText, setText] = useState("")

    const handleSubmission = (e) => {
        if(e.key === "Enter"){
            onSearch(curText);
        }
    }

    return(
        <input className="searchbar col-5"
            type="text"
            value={curText}
            placeholder={placeholder}
            onChange = {(e) => setText(e.target.value)}
            onKeyDown = {handleSubmission}
        ></input>
    )
}

// the top navbar {message=the message to display at the top}
export default function Navbar(props){
    const message = props.message

    const onSearch = (text) => {
        console.log(text)
    }

    return(
        <div className="nav-height nav-container row col-9">
            <span className="col-2"></span>
            <p className="col-5 nav-message">{message}</p>
            <Searchbar onSearch={onSearch} placeholder="Search Players"></Searchbar>
        </div>
    )   
}