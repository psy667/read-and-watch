import * as firebase from "firebase";

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

// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
//     .then(
//         () =>
//         // Existing and future Auth states are now persisted in the current
//         // session only. Closing the window would clear any existing state even
//         // if a user forgets to sign out.
//         // ...
//         // New sign-in will be persisted with session persistence.
//             firebase.auth().signInWithEmailAndPassword(email, password),
//     )
//     .catch((error) => {
//     // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorMessage);
//     });


const provider = new firebase.auth.GoogleAuthProvider();


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log(user);
    // User is signed in.
    } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
                firebase.auth().signInWithRedirect(provider);
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    }
});
//
export const { auth } = firebase;
export const db = firebase.firestore();
