import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCJf2Aupv1P03ijw02KVstfdVZij5c2-HU",
  authDomain: "about-guides.firebaseapp.com",
  databaseURL:
    "https://about-guides-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "about-guides",
  storageBucket: "about-guides.appspot.com",
  messagingSenderId: "350720162338",
  appId: "1:350720162338:web:30a0d16ff1b5f68e65e87b",
  measurementId: "G-1SBRM4GDE9",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db };
