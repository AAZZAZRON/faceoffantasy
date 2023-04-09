import { useEffect, useState } from "react";
import "../../css/navbar.css";

// the search bar {onSearch(text) called when enter is pressed, placeholder string}
export const Searchbar = ({onSearch, placeholder}) => {
    const [curText, setText] = useState("")

    useEffect(() => {
        onSearch(curText);
    }, [curText]);

    return (
        <input className="searchbar col-9 align-middle"
            type="text"
            value={curText}
            placeholder={placeholder}
            onChange = {(e) => setText(e.target.value)}
        ></input>
    )
}
