// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBnHdoeuNO4JJGSIkwcmk3tZrt62b-Dv1A",
  authDomain: "auth-firebase-projeto-au-a0e9d.firebaseapp.com",
  databaseURL: "https://auth-firebase-projeto-au-a0e9d-default-rtdb.firebaseio.com",
  projectId: "auth-firebase-projeto-au-a0e9d",
  storageBucket: "auth-firebase-projeto-au-a0e9d.firebasestorage.app",
  messagingSenderId: "643403882486",
  appId: "1:643403882486:web:02d76ad8d7b5bdb29c31d7",
  measurementId: "G-0WVH2T7W1T"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
