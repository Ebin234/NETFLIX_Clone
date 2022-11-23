import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDossSqbA5NsJl6eeAaHF3JLFwdk9wrlDI",
  authDomain: "react-netflix-clone-f39a4.firebaseapp.com",
  projectId: "react-netflix-clone-f39a4",
  storageBucket: "react-netflix-clone-f39a4.appspot.com",
  messagingSenderId: "32151905946",
  appId: "1:32151905946:web:5949880c2646ab210ae123",
  measurementId: "G-MRDSV2QHSJ"
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)
