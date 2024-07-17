import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCE_7LVQ8zxmHUTLtzBCnYj2t67LsDyXnI",
  authDomain: "sannutech-construction-2d156.firebaseapp.com",
  projectId: "sannutech-construction-2d156",
  storageBucket: "sannutech-construction-2d156.appspot.com",
  messagingSenderId: "1014504309635",
  appId: "1:1014504309635:web:68f359a14e5bff4151ecb6",
  measurementId: "G-BWDZE4VBVQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export const auth = getAuth(app);

export { db, storage,app };
