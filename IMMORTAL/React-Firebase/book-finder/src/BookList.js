import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const BookList = () => {
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);

  const authors = [
    "William Shakespeare",
    "J.K. Rowling",
    "George Orwell",
    "Jane Austen",
    "F. Scott Fitzgerald"
  ];

  const fetchBooks = async () => {
    try {
      const docRef = doc(db, 'books', 'someID');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const booksList = data[author] || [];
        setBooks(booksList);
      } else {
        console.log("No such document found!");
        setBooks([]);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div>
      <h2>Find Books by Author</h2>
      <select value={author} onChange={(e) => setAuthor(e.target.value)}>
        <option value="">Select an Author</option>
        {authors.map((authorName, index) => (
          <option key={index} value={authorName}>
            {authorName}
          </option>
        ))}
      </select>
      <button onClick={fetchBooks}>Search</button>
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
