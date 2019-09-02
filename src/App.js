import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Main from "./pages/Main/page";
import { database } from "./database";

database();

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
