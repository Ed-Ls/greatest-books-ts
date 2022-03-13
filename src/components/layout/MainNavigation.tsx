import React from "react";
import classes from "./MainNavigation.module.css";
import { NavLink } from "react-router-dom";

function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Greatest Books</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/books" activeClassName={classes.active}>
              All Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-book" activeClassName={classes.active}>
              Add a Book
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
