import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDQ3Cw5LtlbmdxN6liRWqsBcJ5GXWnd9bE",
  authDomain: "about-25a53.firebaseapp.com",
  databaseURL:
    "https://about-25a53-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "about-25a53",
  storageBucket: "about-25a53.appspot.com",
  messagingSenderId: "823829035411",
  appId: "1:823829035411:web:4456c5d5a4703489c61066",
  measurementId: "G-HWHSZWQPTP",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db };
