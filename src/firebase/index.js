// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAylxTg8WP7HpQ7KIvWooi_Z0pIAIcYMF0",
  authDomain: "testauth-b84b9.firebaseapp.com",
  projectId: "testauth-b84b9",
  storageBucket: "testauth-b84b9.appspot.com",
  messagingSenderId: "1058906663172",
  appId: "1:1058906663172:web:ae0be718ae5fa7b37b0851",
  measurementId: "G-917305907J"
};
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MESSUREMETNT_ID,
// };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);
const firestoreDb = getFirestore(app);
const storage = getStorage(app);

// const analytics = getAnalytics(app);

export { app, firebaseAuth, firestoreDb, storage };
