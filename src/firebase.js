import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCMqR8rB5KlKmqCQND4zoIfJRSwqgHt94E",
    authDomain: "sannutech-construction.firebaseapp.com",
    projectId: "sannutech-construction",
    storageBucket: "sannutech-construction.appspot.com",
    messagingSenderId: "276097035919",
    appId: "1:276097035919:web:0c19fd11c7e6a0f3a04afa",
    measurementId: "G-11QMYQRE72"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export const auth = getAuth(app);

export { db, storage,app };
