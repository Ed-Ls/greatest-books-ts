import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { getSingleBook } from "../lib/api";

import Comments from "../components/comments/Comments";
import HighlightedBook from "../components/books/HighlightedBook";
import LoadingSpinner from "../components/UI/LoadingSpinner";

function BookDetail() {
  const match = useRouteMatch();
  const params = useParams();

  type bookParams = {
    bookId: string;
  };
  const { bookId } = useParams<bookParams>();

  const {
    sendRequest,
    status,
    data: loadedBook,
    error,
  } = useHttp(getSingleBook, true);

  // const Book = DUMMY_BOOKS.find((book) => book.id === params.bookId);

  useEffect(() => {
    sendRequest(bookId);
  }, [sendRequest, bookId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedBook.author) {
    return <p style={{ color: "white" }}>No Book found!</p>;
  }

  return (
    <Fragment>
      <HighlightedBook loadedBook={loadedBook} />

      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
}

export default BookDetail;
