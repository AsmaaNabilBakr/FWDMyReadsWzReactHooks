import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../../BooksAPI";
import BookCard from "../../CoreComponents/BookCard";
import "../../Assets/App.css";

const HomePage = () => {
  const [AllBooks, setAllBooks] = useState([]);
  const [currentlyReadingBooks, setcurrentlyReadingBooks] = useState([]);
  const [wantToReadBooks, setwantToReadBooks] = useState([]);
  const [readBooks, setreadBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      const AllBooks = await BooksAPI.getAll();
      const currentlyReadingBooks = AllBooks?.filter(
        (book) => book.shelf === "currentlyReading"
      );
      const readBooks = AllBooks?.filter((book) => book.shelf === "read");
      const wantToReadBooks = AllBooks?.filter(
        (book) => book.shelf === "wantToRead"
      );
      setcurrentlyReadingBooks(currentlyReadingBooks);
      setreadBooks(readBooks);
      setwantToReadBooks(wantToReadBooks);
    };
    getAllBooks();
  }, [AllBooks]);

  const userBooks = async () => {
    const AllBooks = await BooksAPI.getAll();
    setAllBooks(AllBooks);
  };

  const changeShelf = async (book) => {
    const newShelf = document.getElementById(book.id).value;
    await BooksAPI.update(book, newShelf);
    await userBooks();
  };

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReadingBooks?.map((book) => (
                    <li key={book.id}>
                      <BookCard
                        updateShelf={changeShelf}
                        book={book}
                        imgURL={
                          book.imageLinks.smallThumbnail !== undefined
                            ? book.imageLinks.smallThumbnail
                            : "https://books.google.nl/googlebooks/images/no_cover_thumb.gif"
                        }
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToReadBooks?.map((book) => (
                    <li key={book.id}>
                      <BookCard
                        updateShelf={changeShelf}
                        book={book}
                        imgURL={
                          book.imageLinks.smallThumbnail !== undefined
                            ? book.imageLinks.smallThumbnail
                            : "https://books.google.nl/googlebooks/images/no_cover_thumb.gif"
                        }
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {readBooks?.map((book) => (
                    <li key={book.id}>
                      <BookCard
                        updateShelf={changeShelf}
                        book={book}
                        imgURL={
                          book.imageLinks.smallThumbnail !== undefined
                            ? book.imageLinks.smallThumbnail
                            : "https://books.google.nl/googlebooks/images/no_cover_thumb.gif"
                        }
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
