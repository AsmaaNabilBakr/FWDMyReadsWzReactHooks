import React, { useEffect, useState } from "react";
import "../Assets/App.css";
import * as BooksAPI from "../BooksAPI";

const BookCard = (props) => {
  const [bookshelf, setbookshelf] = useState("");

  useEffect(() => {
    const getBookshelf = async () => {
      const bookDetails = await BooksAPI.get(props.book.id);
      setbookshelf(bookDetails.shelf);
    };
    getBookshelf();
  });
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.imgURL})`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            id={props.book.id}
            onChange={() => props.updateShelf(props.book)}
          >
            <option selected disabled>
              Move to...
            </option>
            {bookshelf === "currentlyReading" ? (
              <option value="currentlyReading">
                {" "}
                &#10003; Currently Reading
              </option>
            ) : (
              <option value="currentlyReading"> Currently Reading</option>
            )}
            {bookshelf === "wantToRead" ? (
              <option value="wantToRead"> &#10003; Want to Read</option>
            ) : (
              <option value="wantToRead"> Want to Read</option>
            )}
            {bookshelf === "read" ? (
              <option value="read"> &#10003;Read</option>
            ) : (
              <option value="read"> Read</option>
            )}
            {bookshelf === "none" ? (
              <option value="none"> &#10003;None</option>
            ) : (
              <option value="none"> None</option>
            )}
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      {props.book.author && (
        <div className="book-authors">
          {props.book.author.map((authorName, index) => (
            <span key={index}>{authorName}</span>
          ))}
        </div>
      )}
    </div>
  );
};
export default BookCard;
