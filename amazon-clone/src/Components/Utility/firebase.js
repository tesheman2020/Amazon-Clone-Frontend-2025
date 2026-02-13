// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIt6qMLYYmIB68Ei1ajWRhfMdsqQEEqH8",
  authDomain: "clone-67520.firebaseapp.com",
  projectId: "clone-67520",
  storageBucket: "clone-67520.firebasestorage.app",
  messagingSenderId: "1082454415968",
  appId: "1:1082454415968:web:244ce86f1760d7263d4105",
  measurementId: "G-MS4MGPJNYC",
};

// 🔥 1. Initialize Firebase FIRST
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// 🔥 2. Create auth AFTER app is created
export const auth = getAuth(app);

// 🔥 3. THEN set persistence
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Auth persistence set to LOCAL");
  })
  .catch((error) => {
    console.error("Persistence error:", error);
  });

// 🔥 4. Initialize Firestore
export const db = getFirestore(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// //auth
// import { getAuth } from "firebase/auth";

// import { getFirestore } from "firebase/firestore";
// // import "firebase/compat/firestore"
// // import "firebase/compat/auth"

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: "AIzaSyDIt6qMLYYmIB68Ei1ajWRhfMdsqQEEqH8",
//   authDomain: "clone-67520.firebaseapp.com",
//   projectId: "clone-67520",
//   storageBucket: "clone-67520.firebasestorage.app",
//   messagingSenderId: "1082454415968",
//   appId: "1:1082454415968:web:244ce86f1760d7263d4105",
//   measurementId: "G-MS4MGPJNYC",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// getAnalytics(app);

// export const auth = getAuth(app);
// // export const db = app.firestore();
// export const db = getFirestore(app);
