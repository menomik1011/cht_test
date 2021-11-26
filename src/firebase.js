import * as firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBtcLFD8AvUbhzlss3ngvFg5ba-uuhZ4LI",
    authDomain: "trb-bot-001.firebaseapp.com",
    projectId: "trb-bot-001",
    storageBucket: "trb-bot-001.appspot.com",
    messagingSenderId: "907492036716",
    appId: "1:907492036716:web:c0ec3f7095dac313280849"
  };

let app;

if(firebase.apps.length ===0){
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();
// const auth = getAuth();r

export { db, auth };