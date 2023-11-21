import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUqUwJoly4oyTQ9FPVORQI58dSnXj4IFo",
  authDomain: "calendar-14189.firebaseapp.com",
  projectId: "calendar-14189",
  storageBucket: "calendar-14189.appspot.com",
  messagingSenderId: "150042152143",
  appId: "1:150042152143:web:7687b5cf3181f46e883bba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);