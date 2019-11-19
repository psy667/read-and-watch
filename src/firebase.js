import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "read-and-watch.firebaseapp.com",
    databaseURL: "https://read-and-watch.firebaseio.com",
    projectId: "read-and-watch",
    storageBucket: "read-and-watch.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();


firebase.auth()
    .onAuthStateChanged((user) => {
        if (user) {
            // User is signed in.
        } else {
            firebase.auth()
                .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                .then(() => {
                    firebase.auth()
                        .signInWithPopup(provider);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    // eslint-disable-next-line no-console
                    console.dir(errorMessage);
                });
        }
    });


firebase.firestore()
    .settings({
        cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    });

firebase.firestore()
    .enablePersistence();

export const { auth } = firebase;
export const db = firebase.firestore();
