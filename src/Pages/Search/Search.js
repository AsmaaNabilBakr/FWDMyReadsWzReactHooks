import React, {useState} from "react";
import * as BooksAPI from "../../BooksAPI";
import "../../Assets/App.css";
import BookCard from "../../CoreComponents/BookCard";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchResults, setsearchResults] = useState([]);
  const [noImg] = useState("https://books.google.nl/googlebooks/images/no_cover_thumb.gif");

  const searchForBooks = async () => {
    const searchQuery = document.getElementById("search-query").value;
    const searchResults = await BooksAPI.search(searchQuery);
    setsearchResults(searchResults)
  };

  const changeShelf = async (book) => {
    const newShelf = document.getElementById(book.id).value;
    await BooksAPI.update(book, newShelf);
    await searchForBooks()
  };

  return (
    <div className="app">
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              id="search-query"
              onChange={searchForBooks}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResults !== undefined &&
            searchResults.length > 0 ? (
              searchResults.map((book) => (
                <li key={book.id}>
                  <BookCard
                    updateShelf={changeShelf}
                    book={book}
                    imgURL={
                      book.imageLinks
                        ? book.imageLinks.smallThumbnail
                        : noImg
                    }
                  />
                </li>
              ))
            ) : (
              <li>There's No Results</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
