import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyBerRh1bD4alRPUr2BjYwyrNtNnR0xZ8x0",
    authDomain: "clone-1c520.firebaseapp.com",
    databaseURL: "https://clone-1c520.firebaseio.com",
    projectId: "clone-1c520",
    storageBucket: "clone-1c520.appspot.com",
    messagingSenderId: "291493902066",
    appId: "1:291493902066:web:62de6fdffd7eb2dd3e426b",
    measurementId: "G-BZ29SB8YYM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };