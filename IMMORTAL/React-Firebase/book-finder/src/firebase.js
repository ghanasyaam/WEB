import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGLbzt1x5PPdBQkwXIKVXLw4kekg6X-Hw",
  authDomain: "bookdatabase-df0dc.firebaseapp.com",
  projectId: "bookdatabase-df0dc",
  storageBucket: "bookdatabase-df0dc.firebasestorage.app",
  messagingSenderId: "99770623464",
  appId: "1:99770623464:web:b8fe2b07e67f37cce3f05d",
  measurementId: "G-3X8BBKHCDC"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };

