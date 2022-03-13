import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import BookItem from "./BookItem";
import classes from "./BookList.module.css";

//helper function to sort Books by ID
const sortBooks = (books: [], top: boolean) => {
  return books.sort((bookA: { rate: number }, bookB: { rate: number }) => {
    if (top) {
      return bookA.rate < bookB.rate ? 1 : -1;
    } else {
      return bookA.rate > bookB.rate ? 1 : -1;
    }
  });
};

const BookList: React.FC<{
  books: [];
}> = ({ books }) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  //Check a specific query param key
  const isSortingTop = queryParams.get("sort") === "top";

  const sortedBooks = sortBooks(books, isSortingTop);

  const changeSortingHandler = () => {
    //another way of building complex url
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortingTop ? "flop" : "top"}`,
    });

    // history.push(
    //   `${location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    // );
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingTop ? "Flop" : "Top"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedBooks.map(
          (book: {
            id: string;
            key: string;
            author: string;
            rate: number;
            name: string;
          }) => (
            <BookItem
              key={book.id}
              id={book.id}
              author={book.author}
              rate={book.rate}
              name={book.name}
            />
          )
        )}
      </ul>
    </Fragment>
  );
};

export default BookList;
