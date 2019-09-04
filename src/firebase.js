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

const provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().signInWithPopup(provider).then((result) => {
    const { user } = result;
    localStorage.setItem("id", user.uid);
}).catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
});

export const db = firebase.firestore();
