// import logo from "./logo.svg";
import "./App.css";
import { NavLink, Switch, Route, useLocation } from "react-router-dom";
import React, { useState } from "react";

function App(props) {
  function Header() {
    return (
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/add-book">
            Add Book
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/company">
            Company
          </NavLink>
        </li>
        <li>
          <NavLink to="will-not-match">No match</NavLink>
        </li>
      </ul>
    );
  }

  function Home() {
    return <div>Homer</div>;
  }

  function Products({ bookFacade }) {
    const books = bookFacade.getBooks();
    return (
      <div>
        There are {bookFacade.getBooks().length} books in the bookstore
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              ID: {book.id} Title: {book.title} Info: {book.info}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function Company() {
    return "Company";
  }

  function AddBook({ bookFacade }) {
    const startValue = { title: " ", info: " " };
    const { addBook } = bookFacade;
    console.log(addBook);

    const [value, setValue] = useState(startValue);

    function handleCHange(event) {
      setValue({ ...value, [event.target.name]: event.target.value });
    }

    function handleSubmit(e) {
      e.preventDefault();
      addBook(value);
      setValue(startValue);
    }

    return (
      <div>
        <h2>Add Book</h2>;
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            value={value.title}
            onChange={handleCHange}
            placeholder="Title"
          />
          <br></br>
          <input
            name="info"
            value={value.info}
            onChange={handleCHange}
            placeholder="Info"
          />
          <br></br>
          <button type="submit">Add book</button>
        </form>
      </div>
    );
  }

  function NoMatch() {
    let location = useLocation();

    return (
      <div>
        "no match for" <code>{location.pathname}</code>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products">
          <Products bookFacade={props.bookFacade} />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route path="/add-book">
          <AddBook bookFacade={props.bookFacade} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
