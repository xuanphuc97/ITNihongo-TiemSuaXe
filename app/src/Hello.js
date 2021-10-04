import {Link} from "react-router-dom";

const Hello = () => {
    return (
        <div>
            <h3>Hello World!</h3>
            <Link to="/home">go home</Link>
        </div>
    )
}

export default Hello;