import React from "react";
import {
    Button, List, PageHeader, Result, Switch,
} from "antd";
import { auth, authGoogle } from "../../firebase";
import "./styles.scss";
import { useHistory } from "react-router";
import Icon from "./icon.png";
import firebase from "firebase";

export function Login() {
    const history = useHistory();

    auth()
        .onAuthStateChanged((user) => {
            if (user) {
                history.push("/");
            }
        });

    const handleAuthGoogle = () => {
        auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in.
                } else {
                    firebase.auth()
                        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                        .then(() => {
                            const provider = new firebase.auth.GoogleAuthProvider();

                            return firebase.auth()
                                .signInWithPopup(provider);
                        })
                        .catch((error) => {
                            const errorMessage = error.message;
                            // eslint-disable-next-line no-console
                            console.dir(errorMessage);
                        });
                }
            });
    };


    return (
        <div className="login">
            <Result
                title="Read & Watch"
                subTitle="Welcome!"
                icon={<img className="logo" src={Icon} alt="logo" />}
                extra={<button className="button-google" onClick={handleAuthGoogle}>Auth with Google</button>}
            />
        </div>
    );
}
