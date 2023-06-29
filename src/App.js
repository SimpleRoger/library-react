import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Books from "./pages/Books";
// import BookInfo from "./pages/BookInfo";
// import { books } from "./data";
// import Footer from "./components/Footer";
// import Cart from "./pages/Cart";
import Nav from "./components/Nav";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data";
import BookInfo from "./pages/BookInfo";
import Cart from "./pages/Cart";

function App() {
  //cart logic
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    const dupeItem = cart.find((item) => +item.id === +book.id);
    if (dupeItem) {
      dupeItem.quantity += 1;
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  }

  function removeFromCart(book) {
    // setCart([...cart, { ...book, quantity: 1 }]);
    setCart((current) =>
      current.filter((current) => +current.id !== +book.id)
    );
  }
  
  function changeQuantity(book, quantity) {
    // console.log(book.quantity)
    setCart(
      cart.map((item) => {
        if (+item.id === +book.id) {
          return {
            ...item,
            quantity: quantity,
          };
        } else {
          return item;
        }
      })
    );
  }

  function numberOfItems() {
    let counter = 0
    cart.forEach(item => {
      counter += +item.quantity
    })
    return counter
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);
  return (
    <Router>
      <div className="App">
        <Route>
          <Nav numberOfItems = {numberOfItems} />
          <Route path="/" exact component={Home} />
          <Route path="/books" exact render={() => <Books books={books} />} />
          <Route
            path="/books/:id"
            render={() => (
              <BookInfo books={books} addToCart={addToCart} cart={cart} />
            )}
          />
          <Route
            path="/cart"
            render={() => (
              <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeFromCart = {removeFromCart} />
            )}
          />
          <Footer />
        </Route>
      </div>
    </Router>
  );
}

export default App;
