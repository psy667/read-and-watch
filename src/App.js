import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Main from "./pages/Main/page";
// import { startFirebaseUI } from "./firebase.js";


class App extends React.Component {
    componentDidMount() {
        // startFirebaseUI("#firebaseui");
    }

    render() {
        return (
            <div className={"app"}>
                <Router>
                    <Route path="/" exact component={Main} />
                </Router>
            </div>
        );
    }
}

export default App;
