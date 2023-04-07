import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function Home (props) {
    return (
        <div className="row">
            <Sidebar selected="Home"></Sidebar>
            <Navbar message="Hello, user!"></Navbar>
        </div>
    )
}