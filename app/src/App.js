import Header from "./Header/Header";
import Hello from "./Hello";
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";

function App() {
    return (
        <>
            <Header/>
            <Router>
                <Switch>
                    <Route path="/home">
                        <h1>Home</h1>
                        <Link to="/"> &lt;&lt; Default</Link>
                    </Route>
                    <Route path="/">
                        <Hello/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
