import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore"; 

const FirestoreTest = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "books", "someID");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const booksList = Object.keys(data).map((author) => ({
            author,
            title: data[author]
          }));
          setBooks(booksList);
          console.log("Firestore connected successfully:", booksList);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error connecting to Firestore:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Books List</h2>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
};

export default FirestoreTest;
