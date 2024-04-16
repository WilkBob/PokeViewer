// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhPI9qtFh8KyFH-2KyrkGfp_yv3qmLqrY",
  authDomain: "pokeview-8efb2.firebaseapp.com",
  projectId: "pokeview-8efb2",
  storageBucket: "pokeview-8efb2.appspot.com",
  messagingSenderId: "327355187521",
  appId: "1:327355187521:web:c219729a556553059621c0",
  measurementId: "G-024J6XMPET"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);