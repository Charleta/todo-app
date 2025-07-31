import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBm9E0sQ7smgq36G7Sk251c9_azLZPrg4E",
  authDomain: "app-tareas-764e3.firebaseapp.com",
  projectId: "app-tareas-764e3",
  storageBucket: "app-tareas-764e3.firebasestorage.app",
  messagingSenderId: "485994068374",
  appId: "1:485994068374:web:34fc94b52f44db6d7685b7",
  measurementId: "G-PL0X0CVD2C",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db };