import { useState } from "react";
import "../../css/navbar.css";

// the search bar {onSearch(text) called when enter is pressed, placeholder string}
const Searchbar = ({onSearch, placeholder}) => {
    const [curText, setText] = useState("")

    const handleSubmission = (e) => {
        if(e.key === "Enter"){
            onSearch(curText);
        }
    }

    return(
        <input className="searchbar col-9 align-middle"
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
        <div className="nav-height nav-container row d-flex">
            <span className="col-7 text-center d-flex justify-content-center">
                <span className="d-flex align-items-end"><span className="nav-message">{message}</span></span>
            </span>
            <span className="col-5 d-flex align-items-center"><Searchbar onSearch={onSearch} placeholder="Search Players"></Searchbar></span>
        </div>
    )   
}