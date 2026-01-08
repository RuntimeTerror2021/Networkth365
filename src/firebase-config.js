// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZ0sFVneKrs4WOxfI9CrSNyxlQCHNHOeA",
    authDomain: "networkth365.firebaseapp.com",
    projectId: "networkth365",
    storageBucket: "networkth365.firebasestorage.app",
    messagingSenderId: "408262462650",
    appId: "1:408262462650:web:0fc13d2397d1ab96304683",
    measurementId: "G-PHKPTSQCV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);