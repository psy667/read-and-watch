import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Main from "./pages/Main/page";

function App() {
    return (
        <div>
            <Router>
                <Route path="/" exact component={Main} />
            </Router>
        </div>
    );
}

export default App;
