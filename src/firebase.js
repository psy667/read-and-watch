import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_BiBJCaJSBdWO82jdxAOdvcnsWmn_DVw",
    authDomain: "read-and-watch.firebaseapp.com",
    databaseURL: "https://read-and-watch.firebaseio.com",
    projectId: "read-and-watch",
    storageBucket: "read-and-watch.appspot.com",
    messagingSenderId: "1005289530359",
    appId: "1:1005289530359:web:19352fec4ee63bad9984f2",
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
    // User is signed in.
    } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase.auth().signInWithPopup(provider);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
});


firebase.firestore().settings({
    cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
});

firebase.firestore().enablePersistence();

export const { auth } = firebase;
export const db = firebase.firestore();
