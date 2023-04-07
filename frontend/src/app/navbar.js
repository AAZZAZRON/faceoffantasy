import { useState } from "react";
import "../css/nav.css";

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