import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Main from "./pages/Main/page";


export default function App() {
    return (
        <div className="app">
            <Router>
                <Route path="/" exact component={Main} />
            </Router>
        </div>
    );
}
