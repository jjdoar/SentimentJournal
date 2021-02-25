import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAJ1-AXD6AW31C4OByQWbnKpMPBW3AJePQ",
    authDomain: "mirror-52c9f.firebaseapp.com",
    projectId: "mirror-52c9f",
    storageBucket: "mirror-52c9f.appspot.com",
    messagingSenderId: "558268872280",
    appId: "1:558268872280:web:e3ffb2ba6cfbad663ebc2d",
    measurementId: "G-X7C8Y9ZPGZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();