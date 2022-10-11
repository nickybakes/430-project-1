// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
const firebase = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaEqKiFXyhwH7vON6o9VzBApGsil0lshc",
  authDomain: "project-1-430.firebaseapp.com",
  projectId: "project-1-430",
  storageBucket: "project-1-430.appspot.com",
  messagingSenderId: "384509263374",
  appId: "1:384509263374:web:a240125d78fea6a2ad865f"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log(firebase.getApp());

const databasePath = "430's Place";

const db = getDatabase();

const dataRef = firebase.ref(db, databasePath);

//set the callback for when firebase data changes
//we set onlyOnce to true so it doesnt refresh while people are viewing presentations
// export const onValueCallback = (presentationsChanged) =>{
//     onValue(presentationsRef, presentationsChanged, { onlyOnce: true });
// }

const readData = () => {
  let readValue = firebase.get(dataRef).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  }).catch((error) => {
    console.error(error);
  });
  return readValue;
}

const writeData = (data) => {
  firebase.set(dataRef, data);
}

// export our functions to be used in server.js
module.exports = {
  readData,
  writeData
};