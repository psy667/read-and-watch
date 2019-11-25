import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.scss";
import Main from "./pages/Main/page";
import { Profile } from "./pages/Profile/page";
import { Login } from "./pages/Login/page";


export default function App() {
    return (
        <div className="app">
            <Router>
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Main} />
                <Route path="/user/:id" component={Profile} />

            </Router>
        </div>
    );
}
