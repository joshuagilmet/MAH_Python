import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDpQm2L7YF3Yx3tOk9Kdam84P3oEE44UQ4",
  authDomain: "ayso-tracker.firebaseapp.com",
  projectId: "ayso-tracker",
  storageBucket: "ayso-tracker.firebasestorage.app",
  messagingSenderId: "50552490528",
  appId: "1:50552490528:web:0e4360e50e378cba668a45",
  measurementId: "G-W6PS7CE9WL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
