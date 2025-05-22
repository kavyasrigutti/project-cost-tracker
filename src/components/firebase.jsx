// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWGVOBuYqC2AEtSWThaU59uFLyVolDQvA",
  authDomain: "projectcosttracker-c7be9.firebaseapp.com",
  projectId: "projectcosttracker-c7be9",
  storageBucket: "projectcosttracker-c7be9.firebasestorage.app",
  messagingSenderId: "753563784317",
  appId: "1:753563784317:web:4650b373e53799ca054d14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;