
import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCEwIUyEtxgU-pp6sX-VrHOzYLC7Sibd2M",
    authDomain: "in-the-loop-306520.firebaseapp.com",
    projectId: "in-the-loop-306520",
    storageBucket: "in-the-loop-306520.appspot.com",
    messagingSenderId: "269420857313",
    appId: "1:269420857313:web:8c44d7ef406d18e6f7f4a0",
    measurementId: "G-57KHTXZVJD"
};

const app = getApps().length <= 0 ?
    initializeApp(firebaseConfig) :
    getApp();

const db = getFirestore(app);
const auth = getAuth(app);

export {
    auth,
    db,
    app,
}