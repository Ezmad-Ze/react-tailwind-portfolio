import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGE,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
