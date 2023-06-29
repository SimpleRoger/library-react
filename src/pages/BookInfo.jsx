import React from "react";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Price from "../components/ui/Price";
import Rating from "../components/ui/Ratings";
import Book from "../components/ui/Book";

const BookInfo = ({ books, addToCart, cart }) => {
  const { id } = useParams();
  const book = books.find((book) => +book.id == +id);
  const [added, setAdded] = useState(false);

  function addBookToCart(book) {
    setAdded(true);
    addToCart(book);
  }

  function bookExistsOnCart() {
    return cart.find((book) => +book.id === +id);
  }
  return (
    <div>
      <div id="books__body">
        <div id="books__main">
          <div className="books__container">
            <div className="row">
              <div className="book__selected--top">
                <Link to="/books" className="book__link">
                  <FontAwesomeIcon icon="arrow-left"></FontAwesomeIcon>
                </Link>
                <Link to="/books" className="book__link">
                  <h2 className="book__selected--title--top">Books</h2>
                </Link>
              </div>
              <div className="book__selected">
                <figure className="book__selected--figure">
                  <img src={book.url} alt="" className="book__selected--img" />
                </figure>
                <div className="book__selected--descirption">
                  <h2 className="book__selected--title">
                    {book.title}
                    <Rating rating={book.rating} />
                    <div className="book__selected--price">
                      <Price
                        originalPrice={book.originalPrice}
                        salePrice={book.salePrice}
                      ></Price>
                    </div>
                    <div className="book__summary">
                      <h3 className="book__summary--title">Summary</h3>
                      <p className="book__summary--para">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ex ab corporis ea quaerat dolorum voluptas, enim
                        delectus nihil omnis saepe exercitationem explicabo
                        quidem quis fuga tempora eum, iure repellendus
                        temporibus?
                      </p>
                      <p className="book__summary--para">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ex ab corporis ea quaerat dolorum voluptas, enim
                        delectus nihil omnis saepe exercitationem explicabo
                        quidem quis fuga tempora eum, iure repellendus
                        temporibus?
                      </p>
                    </div>
                    {bookExistsOnCart() ? (
                      <Link to={`/cart`} className="book__link">
                        <button className="btn">Checkout</button>
                      </Link>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => addBookToCart(book)}
                      >
                        Add to cart
                      </button>
                    )}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="books__container">
            <div className="row">
              <div className="book__selected--top">
                <h2 className="book__selected--title--top">
                  Recommended Books
                </h2>
              </div>
              <div className="books">
                {books
                  .filter((book) => book.rating === 5 && +book.id !== +id)
                  .slice(0, 4)
                  .map((book) => (
                    <Book book={book} key={book.id} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
